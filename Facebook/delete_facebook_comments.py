import asyncio
from playwright.async_api import async_playwright

async def run_fb_cleaner():
    async with async_playwright() as p:
        print("1. Hooking into your active Chrome window...")
        
        try:
            browser = await p.chromium.connect_over_cdp("http://127.0.0.1:9222")
        except Exception as e:
            print(f"Failed to connect. The exact system error is: {e}")
            return

        context = browser.contexts[0]
        page = context.pages[0]

        print("2. Navigating to Facebook Activity Log...")
        await page.goto("https://www.facebook.com/me/allactivity/?category_key=COMMENTSCLUSTER")
        
        print("\n--- ACTION REQUIRED ---")
        print("Press ENTER in this terminal when your comments list is fully loaded.")
        input("Waiting for you to press Enter...")

        while True:
            try:
                # 1. Target the 'All' checkbox
                all_btn = page.get_by_label("All", exact=True)
                
                if await all_btn.is_visible():
                    await all_btn.click()
                    print("✓ Batch selected.")
                    await asyncio.sleep(2)

                    # 2. Main 'Remove' click 
                    main_remove = page.get_by_text("Remove", exact=True).first
                    if await main_remove.is_visible():
                        await main_remove.click()
                        print("✓ Main Remove clicked.")
                        await asyncio.sleep(2)

                        # 3. The Modal 'Remove' click (Fixed Strict Mode Violation)
                        # We explicitly filter the modal containers to find the one with the correct header, 
                        # and use .first to ignore the hidden "ghost" modals.
                        modal_container = page.locator('div.x1uvtmcs').filter(has_text="Remove Interaction?").first
                        
                        if await modal_container.is_visible():
                            # Find the text 'Remove' strictly inside the active modal
                            modal_remove_btn = modal_container.get_by_text("Remove", exact=True).first
                            
                            if await modal_remove_btn.is_visible():
                                await modal_remove_btn.click()
                                print("✓ Final popup confirmed!")
                            else:
                                print("! Found the modal, but couldn't find the 'Remove' text inside it.")
                                await page.keyboard.press("Escape")
                        else:
                            print("- No confirmation modal appeared.")

                        print("Waiting 8 seconds for Facebook to process the deletion...")
                        await asyncio.sleep(8) 
                else:
                    print("Scanning... Scrolling down to load more comments.")
                    await page.mouse.wheel(0, 1500)
                    await asyncio.sleep(4)

            except Exception as e:
                print(f"Error encountered: {e}. Retrying in 5 seconds...")
                await asyncio.sleep(5)

if __name__ == "__main__":
    asyncio.run(run_fb_cleaner())
