import { test, expect } from "@playwright/test";

for (const width of [390, 1280]) {
  test(`invitation interactions at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto("/");
    await expect(page.locator("main")).toHaveAttribute("inert", "");
    await page.getByRole("button", { name: "Open wedding invitation" }).click();
    await expect(page.locator("main")).not.toHaveAttribute("inert", "");
    await expect(page.locator(".monogram")).toBeFocused();
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
    await expect(page.getByRole("status")).toContainText(
      "joyfully accepting, 1 guest",
    );
    await page.getByLabel("Regretfully decline").check();
    await expect(page.getByLabel("Number of guests")).toBeDisabled();
    await page.getByRole("button", { name: "PREVIEW MY RSVP" }).click();
    await expect(page.getByRole("status")).toContainText(
      "regretfully declining",
    );
    await expect(page.getByRole("status")).toContainText(
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
    await expect(
      page.getByRole("button", { name: "Open wedding invitation" }),
    ).toBeFocused();
    expect(errors).toEqual([]);
  });
}

test("reduced motion skips petals", async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.getByRole("button", { name: "Open wedding invitation" }).click();
  await expect(page.locator(".monogram")).toBeFocused();
  await expect(page.locator(".confetti")).toHaveCount(0);
  await expect(page.locator("#celebration")).toHaveCSS("opacity", "1");
});
