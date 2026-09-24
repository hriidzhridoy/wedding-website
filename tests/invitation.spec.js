import { test, expect } from "@playwright/test";

async function openInvitation(page) {
  await page.goto("/");
  await expect(page.locator("main")).toHaveAttribute("inert", "");
  await page.getByRole("button", { name: "Open wedding invitation" }).click();
  await expect(page.locator("#home h1")).toBeFocused();
  await expect(page.locator("main")).not.toHaveAttribute("inert", "");
}

async function hasConfetti(page) {
  return page.locator(".side-cannons").evaluate((canvas) => {
    const pixels = canvas
      .getContext("2d")
      .getImageData(0, 0, canvas.width, canvas.height).data;
    return pixels.some((value, index) => index % 4 === 3 && value > 0);
  });
}

async function assertLocked(page) {
  await expect(page.locator("#invitation-content")).toHaveCount(0);
  await expect(
    page.locator("#venue, #rsvp, .countdown, footer, nav"),
  ).toHaveCount(0);
  await expect(page.locator("#home")).toHaveCount(1);
  await expect(page.locator("#home .scroll-link")).toHaveAttribute(
    "href",
    "#scratch-date",
  );
  await expect(page.locator("#home .date-line")).not.toContainText("DECEMBER");
  expect(await hasConfetti(page)).toBe(false);
}

async function shortSwipe(page, card, touch = false) {
  await card.evaluate((element) =>
    element.scrollIntoView({ block: "center", behavior: "instant" }),
  );
  const box = await card.boundingBox();
  const start = { x: box.x + box.width * 0.4, y: box.y + box.height * 0.5 };
  const end = { x: box.x + box.width * 0.6, y: start.y };
  if (touch) {
    const session = await page.context().newCDPSession(page);
    await session.send("Input.dispatchTouchEvent", {
      type: "touchStart",
      touchPoints: [start],
    });
    await session.send("Input.dispatchTouchEvent", {
      type: "touchMove",
      touchPoints: [end],
    });
    // Verify the short swipe itself reveals the date, before the touch ends.
    await expect(card).toHaveClass(/is-revealed/);
    await session.send("Input.dispatchTouchEvent", {
      type: "touchEnd",
      touchPoints: [],
    });
    await session.detach();
  } else {
    await page.mouse.move(start.x, start.y);
    await page.mouse.down();
    await page.mouse.move(end.x, end.y, { steps: 5 });
    await expect(card).toHaveClass(/is-revealed/);
    await page.mouse.up();
  }
}

for (const width of [390, 1280]) {
  test(`focused date reveal and invitation at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await openInvitation(page);
    await assertLocked(page);
    await expect(page.locator(".heart-balloon")).toHaveCount(9);
    await expect(
      page.getByRole("button", { name: "Trigger Side Cannons" }),
    ).toHaveCount(0);
    const day = page.locator(".scratch-surface").nth(0);
    const dimensions = await day.boundingBox();
    expect(Math.abs(dimensions.width - dimensions.height)).toBeLessThan(1);
    await expect(day).toHaveCSS("border-radius", "50%");
    await shortSwipe(page, day);
    await expect(day).toHaveAccessibleName("Day: 18");
    await assertLocked(page);
    await page.getByRole("button", { name: "Reveal wedding month" }).focus();
    await page.keyboard.press("Enter");
    await assertLocked(page);
    await shortSwipe(
      page,
      page.locator(".scratch-surface").nth(2),
      width === 390,
    );
    await expect(page.locator(".scratch-status")).toContainText("It's a date");
    await expect(page.locator("#invitation-content")).toHaveCount(1);
    await expect.poll(() => hasConfetti(page)).toBe(true);
    await expect(page.locator(".heart-balloon")).toHaveCount(0);
    await page.getByRole("link", { name: "EXPLORE YOUR INVITATION" }).click();
    await expect(page.locator("#invitation-content")).toBeFocused();
    await expect(page.locator(".date-line")).toContainText("DHAKA, BANGLADESH");
    await expect(page.locator(".countdown strong")).toHaveCount(4);
    await expect(page.locator(".countdown")).not.toContainText("NaN");
    const oldTime = await page.locator(".countdown").innerText();
    await expect
      .poll(() => page.locator(".countdown").innerText())
      .not.toBe(oldTime);
    const downloadEvent = page.waitForEvent("download");
    await page.getByRole("button", { name: "ADD TO YOUR CALENDAR" }).click();
    const download = await downloadEvent;
    expect(download.suggestedFilename()).toBe("wedding-date.ics");
    const stream = await download.createReadStream();
    const chunks = [];
    for await (const chunk of stream) chunks.push(chunk);
    const calendar = Buffer.concat(chunks).toString();
    expect(calendar).toContain("DTSTART:20261218T123000Z");
    expect(calendar).toContain("DTEND:20261218T163000Z");
    await page.getByLabel("Your full name").fill("Test Guest");
    await page.getByRole("button", { name: "PREVIEW MY RSVP" }).click();
    await expect(page.locator("#form-status")).toContainText(
      "joyfully accepting, 1 guest",
    );
    await page.getByLabel("Regretfully decline").check();
    await expect(page.getByLabel("Number of guests")).toBeDisabled();
    await page.getByRole("button", { name: "PREVIEW MY RSVP" }).click();
    await expect(page.locator("#form-status")).toContainText(
      "regretfully declining",
    );
    await expect(page.locator("#form-status")).toContainText(
      "has not been sent or saved",
    );
    const columns = await page
      .locator("#venue")
      .evaluate(
        (element) =>
          getComputedStyle(element).gridTemplateColumns.split(" ").length,
      );
    expect(columns).toBe(width < 700 ? 1 : 2);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.getByRole("button", { name: "REPLAY THE INVITATION" }).click();
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await expect(page.locator(".scratch-surface.is-revealed")).toHaveCount(0);
    await expect(
      page.getByRole("button", { name: "Open wedding invitation" }),
    ).toBeFocused();
    await assertLocked(page);
    await page.getByRole("button", { name: "Open wedding invitation" }).click();
    await expect(page.locator("#home h1")).toBeFocused();
    await expect(page.locator(".heart-balloon")).toHaveCount(9);
    expect(errors).toEqual([]);
  });
}

test("optional reveal works without scratching and respects reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await openInvitation(page);
  await assertLocked(page);
  await expect(page.locator(".heart-balloon")).toHaveCount(0);
  await page.getByRole("button", { name: "Reveal the date for me" }).click();
  await expect(page.locator(".scratch-surface.is-revealed")).toHaveCount(3);
  await expect(page.locator("#invitation-content")).toBeVisible();
  expect(await hasConfetti(page)).toBe(false);
  await expect(page.locator("#celebration")).toHaveCSS("opacity", "1");
});

test("tapping circles unlocks the invitation only after all three", async ({
  page,
}) => {
  await openInvitation(page);
  for (const label of ["day", "month", "year"]) {
    await assertLocked(page);
    await page.getByRole("button", { name: `Reveal wedding ${label}` }).click();
  }
  await expect(page.locator("#invitation-content")).toHaveCount(1);
  await expect(page.locator(".scratch-surface.is-revealed")).toHaveCount(3);
});

test("reload starts at the hero instead of the scratch section", async ({ page }) => {
  await openInvitation(page);
  await page.locator("#scratch-date").scrollIntoViewIfNeeded();
  await page.evaluate(() => {
    window.location.hash = "scratch-date";
  });
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBeGreaterThan(0);

  await page.reload();

  await expect(page).toHaveURL(/\/$/);
  await expect.poll(() => page.evaluate(() => window.scrollY)).toBe(0);
  await expect(page.locator("#home")).toBeInViewport();
});
