YUURA BABY MINIGAME ASSETS
==========================

This ZIP contains source art for the Baby Yuura phase of the Yuura raising game.
Keep these source sheets unchanged. If individual sprites are needed, create cropped derivatives in a separate generated/crops folder.

character/
- baby_yuura_expression_sheet_v2.png
  Latest expression sheet. Includes: normal, smile, big joy, crying, neutral, sleepy, drowsy, sleeping, milk-drinking, milk-satisfied, angry milk-refusal, awake.

ui_items/
- baby_minigame_items_ui_sheet.png
  Includes bottle, thermometer, water splash, covering hands, "baa!" effect, blanket, pillow, patting hand, Zzz, rhythm panel, PERFECT, CLEAR, MISS, timer bar.

backgrounds/
- bg_milk_kitchen.png       : Milk-cooling game
- bg_peekaboo_dayroom.png   : Peekaboo game
- bg_sleep_nightroom.png    : Pat-to-sleep game

reference/
- baby_yuura_original_design_reference.png
  Original Baby Yuura design reference. Use for visual consistency only.

BABY PHASE RULES
----------------
Three minigames. Each minigame is played exactly twice = 6 plays total.
Each play awards:
- PERFECT = 2 points
- CLEAR   = 1 point
- MISS    = 0 points
Total maximum = 12 points.
Provisional evolution thresholds (to be tuned after playtesting):
- 10-12: Genius Yuura
- 6-9  : Kid Yuura
- 0-5  : Bad Kid Yuura

MINIGAME 1: MAKE THE MILK
- 10 sec.
- Start at 70 C.
- Cool the bottle under running water by shaking/moving it.
- Current temperature is visible on a thermometer UI.
- 38 C exactly: PERFECT.
- 36-40 C except exact 38: CLEAR.
- Otherwise: MISS.
- PERFECT reaction: drinks extremely happily.
- CLEAR: drinks normally.
- MISS: angrily refuses and bats the bottle away.

MINIGAME 2: PEEKABOO
- 10 sec / 10 judgments.
- Hold the button during "inai-inai"; release for "baa!".
- Yuura's visible expression changes rapidly while holding.
- Release at the best expression/timing.
- Per judgment: GREAT=3, OK=1, MISS=0.
- Current provisional timing windows: GREAT about +/-0.12 sec, OK about +/-0.30 sec; tune after playtest.
- Round result: 20-30 = PERFECT; 9-19 = CLEAR; 0-8 = MISS.

MINIGAME 3: PAT TO SLEEP
- Short memory + rhythm game.
- Show a sample pat rhythm, then the player reproduces it by tapping.
- Rhythm pattern changes each play.
- Start easy and use about 3 sequences per play.
- Provisional result: all/near-perfect sequences = PERFECT; majority success = CLEAR; otherwise MISS.
- Exact thresholds should be tuned after playtesting.

evolution_reference/
- kid_yuura_reference.png
- bad_kid_yuura_reference.png
- genius_yuura_reference.png
  Reference sheets for the result/evolution screen after the 6 Baby Phase plays. They are reference images; crop/create derived display assets without altering originals.
