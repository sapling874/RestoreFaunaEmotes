// Generate this list with:
// yt-dlp --flat-playlist --print "\"%(id)s\", // %(title)s" https://www.youtube.com/channel/UCO_aKKYxn4tvrqPjcTzZ6EQ
// Shorts end up at all at the end of the list, can be removed.

const faunaVideoIds = [
	"XWTZV3ZqrrE", // Fauna Plays Outer Wilds: Epilogue
	"hNpjuh15sAY", // Fauna Plays Outer Wilds: Finale 【The End】
	"LoaKrpFYfxU", // Fauna Plays Outer Wilds: Episode 20 【Panic】
	"OMxmRXSujmk", // Fauna Plays Outer Wilds: Episode 19 【Death】
	"hgCnJdre_Zs", // Fauna Plays Outer Wilds: Episode 18 【Fangirl】
	"Dx5lmLZueQU", // Fauna Plays Outer Wilds: Episode 17 【Breakthrough】
	"TKjrkEqNC-A", // Fauna Plays Outer Wilds: Episode 16 【No Time For Caution】
	"HhSgIbanlt0", // Fauna Plays Outer Wilds: Episode 15 【Puncture】
	"I8wXrHWLSUs", // Fauna Plays Outer Wilds: Episode 14 【Jump】
	"QeVxfZTKmNI", // Fauna Plays Outer Wilds: Episode 13 【Melt】
	"348zBtJtElo", // Fauna Plays Outer Wilds: Episode 12 【Fossil】
	"vCpr0D9U23w", // Fauna Plays Outer Wilds: Episode 11 【Philosophy】
	"QXPVfPQ31Ag", // Fauna Plays Outer Wilds: Episode 10 【Poem】
	"ezl3JPa3ya0", // Fauna Plays Outer Wilds: Episode 9 【Baby】
	"GE62cjhFCGo", // Fauna Plays Outer Wilds: Episode 8 【Elevator】
	"eFiFDfduq6A", // Fauna Plays Outer Wilds: Episode 7 【Binary】
	"Qvl2Rm18yRg", // Fauna Plays Outer Wilds: Episode 6 【Caves】
	"G1xcXQXQAAY", // Fauna Plays Outer Wilds: Episode 5 【Thalassophobia】
	"OzCqE9IzQaQ", // Fauna Plays Outer Wilds: Episode 4 【Beacon】
	"jjADTsZl2Kk", // Fauna Plays Outer Wilds: Episode 3 【Black Hole】
	"YUiwPh3_DtM", // Fauna Plays Outer Wilds: Episode 2 【Feldspar】
	"SbPP1i6INPk", // Fauna Plays Outer Wilds: Episode 1 【Jumbo Marshmallow】
	"oD3WKMmqUAk", // 【KU100 ASMR】 Comfy ASMR for you! ♡ Ear cleaning, heartbeats for sleep & relaxation ♡
	"IdgKmhbsZt0", // キュートなカノジョ - Ceres Fauna 【COVER】
	"INUYO8-RKuE", // 【ASMR Roleplay】 Priestess Cures Your Insomnia [Horror ASMR]
	"0RMVJTLZOzQ", // 【Original Song MV】 Let Me Stay Here - Ceres Fauna
	"GxJnt2PtSUk", // 【KU100 ASMR】 Let me brush your hair until you fall asleep ♡
	"VRoZzI0DHkY", // Good morning~ ♡
	"R52tdP-hRfU", // 【ASMR】 Rest Your Head On My Lap~ ASMR for Stress Relief
	"wM_J4K2ZeBU", // 【ASMR】 Ear Cleaning & Oil Massage Treatment For Saplings 🌱
	"PNDaXycPDZM", // 【ASMR Roleplay】 Yandere Fauna Wants You to Stay Forever ♡ [Horror ASMR?]
	"OFIVy79pgWc", // Faunwell! 🌿💚
	"My0Zm883qkY", // kirin of the puddle what is your wisdom
	"3O4jBkgdWRQ", // 【MINECRAFT】 THE GRAND FINALE. THE WORLD TREE IS COMPLETE
	"XNiRgmK54Hg", // Drawing Hololive Members From Memory with @GawrGura !
	"DN_yE9bmiq4", // 【MINECRAFT】 O world tree o world tree! how beautiful your froglights
	"ZAJDCoC2UCo", // 【Silent Hill 2】 The real Silent Hill was the friends we made along the way (spoilers) (FINALE)
	"5gzH1lbjCjk", // 【Silent Hill 2】 WEEKEND MARATHON START (spoilers)
	"0nB58ASPAhw", // Mumei and Fauna investigate infighting on Wikipedia Talk Pages
	"w1UX1_0ra5A", // 【DOTA 2】 I made my genmates play Dota 2 with me
	"nu0m8saCjBs", // 【MINECRAFT】 It's the most wonderful time of the weeeeek 🎶🎄
	"z4ZLrg4f6C0", // 【Silent Hill 2】 Silent Hill isn't so silent anymore with all this yapping (spoilers)
	"OHIPvmXN42w", // 【Emberward】 Highly rated roguelite tower defense!
	"E6-rsfpT3rs", // 【MINECRAFT】 The world tree will be completed !!!
	"9kgwG-WQP8s", // 【L.A. Noire】 I did not hit her with my car, I DID NOT HIT HER | #5
	"JO66w4NAZ94", // 【Pikmin 2】 Truly the gendo ikari of pikmin captains | #7
	"quFHbTlBYPU", // 【Family Feud】 PUT ME IN, I KNOW THE ANSWER
	"lVJTvWatH28", // 【L.A. Noire】 No Nonsense November is over, you know what that means | #4
	"3tMokEZmVJ8", // 【SKYRIM】 You can take the girl outta Skyrim but you can't take the Skyrim outta the girl
	"6DolP8msG14", // Important announcement (the serious kind)
	"TWpZANBBLVQ", // Saying hi to all 914,434 of my subscribers*
	"j8AUvy_fHp4", // 【Grunn】 This Gnome Gardening Game Isn't What It Seems
	"0mG4EaaT39s", // 【L.A. Noire】 I keeps one in the chamber in case you ponderin' | #3
	"_zqRYNFTmsc", // 【L.A. Noire】 Fear not, the city is safe in my capable hands! | #2
	"Ttxwtyx-Htk", // 【Silent Hill 2】 Is that TRIANGULAR PRISM HEAD?! (spoilers) (please save us)
	"14S18Ykq0_w", // 【MINECRAFT】 The world tree isn't gonna build itself
	"oaZXf0yDBQc", // 【Rusty Lake Paradise】 do you remember comfy members puzzle games? | #7
	"x_Ua2dWZYtk", // 【Silent Hill 2】 Fauna + Gigi VS classic horror (spoilers) (please save us)
	"WuIfVUV3kiw", // 【Pikmin 2】 It's just a submerged castle, how bad could it be? | #6
	"OlaR3tnlg9g", // 【L.A. Noire】 Kirin solves crimes perfectly (X)
	"p33EIS2mxSc", // 【DREDGE: The Iron Rig】 Trapped on an oil rig surrounded by sea monsters
	"Jd65WuXs5hM", // 【Unsorted Horror】 a charcuterie of dread inducing horror games
	"BRSyG87xGUI", // 【Pikmin 2】 oh no! the pikmin are dying! | #5
	"Z661zh4wywk", // 【Unsorted VHS】 Modern retro horror puzzle game by the creator of Buckshot Roulette
	"9_Ue4fOMNP8", // 【Mouthwashing】 The strange, unsettling horror game where you drink mouthwash to survive
	"iIBywcAIMD0", // the first solo fauna stream in 8,000 years
	"zDpMKezk_GQ", // 【THE FOREST】 I love this ridiculous & scary survival crafting game
	"yDiY3v8s8pw", // 【7 DAYS TO DIE】 THE FINAL DAY. PLANT VS ZOMBIES.
	"XpQ1OlUNV9g", // 【7 DAYS TO DIE】 This kirin can solo a bear with just her fists | DAY 6
	"jbu5FdNzcCE", // 【7 DAYS TO DIE】 eat sleep punch repeat | DAY 5
	"akv2nfjvPu4", // 【7 DAYS TO DIE】 the horde approaches (for the se-third time) | DAY 4
	"SbEW2xDMjHY", // 【7 DAYS TO DIE】 FAUNA PUNCHHHH | DAY 3
	"MMhqW1r-L3g", // 【7 DAYS TO DIE】 the slap build is online | DAY 2
	"4CwVJqu_zMk", // 【7 DAYS TO DIE】 holoEN zombie survival | DAY 1
	"asOqbzIfCn0", // 【TCG Card Shop Simulator】 May I interest you in this blue eyes white wolgin?
	"2pXtvJMZoJc", // 【Pikmin 2】 I'm about to PikLose it | #4
	"gv1hSIO-uGg", // 【Buckshot Roulette】 I would simply win
	"J3ERu05HUBc", // 【3 Years of Membership】 Celebrating together!!
	"7k7DGy_if48", // 【Pikmin 2】 They're calling it the hardest pikmin game ever released | #3
	"BK4Jho48tb4", // 【Arctic Eggs】 The Physics Based Egg Cooking Simulator With Overwhelmingly Positive Reviews
	"kshWK9WEMYc", // 【Members Only】 Spooky Story Reading~
	"s_w0Iw_ywyQ", // 【Pikmin 2】 I promise not to throw any more pikmin into the electric fence | #2
	"_ANx02tF60E", // 【Pikmin 2】 The authentic kindergarten teacher on a field trip experience
	"TzW6VRf4KjQ", // chatting and super catchup!
	"8x-MVX8h9gU", // 【ENReco FINALE】 FaunaMart is done.
	"j4AxXzluEWE", // 【ENReco Day 6】 FaunaMart is for the LIBRARY
	"iRM_kaxQBp4", // 【ENReco Day 5】 Here at Faunamart, the customer is al̵̜̕w̵͇̍a̴͙͐y̴̯͛s̸͍͋ ̵̪̿r̴̹͐i̴̞̎g̷̣̒h̶̲͊ť̵̝
	"E2JxBxhda9I", // 【ENReco Day 4】 💰 BONES FOR SALE 🎰 LOTTERY DRAWING HAPPENING
	"eAdmDEi56yM", // This kirin is reading superchats!
	"menSag1VKTc", // 【ENReco Day 3】 FAUNAMART IS OPEN 💰 GET YER LOTTO TICKETS HERE 🎰
	"eUQWfgVwwpo", // 【ENReco Day 2】 Setting up shop
	"VrLNA0SjYN8", // 【ENReco Day 1】 The holoEN Minecraft RP SMP arc begins...
	"XE9_p01SN_I", // fauna (✿◕‿◕)
	"mU6kLQ37Hdg", // 【#Faunaversary2024】 Playing truck sim with a real steering wheel and 3D tracking for my ANNIVERSARY
	"3KCB1aETLpY", // 【Rusty Lake Paradise】 The mystery continues! (finally) | #6
	"mPQqDGxix-Q", // 【FNAF: INTO THE PIT】 New Five Nights at Freddy's?
	"Z1kjnYhAQYE", // 【Sucker for Love: Date to Die For】 The final chapter
	"dtE1JW5ELFU", // 【DARK SOULS: REMASTERED】 Truly the Dark Souls of Dark Souls
	"v-v0VgBDjbk", // 【MINECRAFT】 Did you know there are over 60,000 tree species?
	"y9dE1sbMJLU", // 【Sucker for Love: Date to Die For】 Smooching eldritch horrors has never been so difficult
	"4RhvYh5Etrk", // 【Members Only】 Fauna softly reads wikipedia to you
	"kvJxZ-jFa_U", // 【Pikmin】 this bulborb looks at your red pikmin like this, wyd?
	"VNENRTLyv7c", // 【Pikmin】 The Nintendo game that gave me nightmares as a child
	"QVB5L20xXZw", // 【Planet Zoo】 I got stung by a wasp so I will now enact my revenge upon all insectkind in planet zoo
	"duQ827WHrFc", // 【THE WITCHER 3】 MAIN STORY FINALE (FAUNA END) | #15
	"N195rqVn9Us", // 【Volcano Princess】 The Parenting Simulator RPG Where Things Can Go Terribly Wrong
	"20wZkZlk_bU", // 【Fitness Boxing feat. HATSUNE MIKU】 omg miku hi!!!!
	"6uoGhsGm0eg", // 【Sucker for Love: Date to Die For】 The Lovecraftian Dating Sim is Back and... More Furry?
	"orTap5eCZk8", // The Stream Where Fauna Speedruns Writing and Performing an Original Rap Song
	"ODll2JO1qKs", // 【Members Only】 Practicing my lyre harp!
	"W_IvPN4CVJQ", // 【THE WITCHER 3】 Reports of The Witcher 3's death are greatly exaggerated | #14
	"xtnwELBZQbQ", // 【Crow Country】 Will You Survive This Mystery and Monster Filled Theme Park? No no NO nno | #2
	"xxuGCr4_UBw", // 【MINECRAFT】 Minecraft alpha was released 14 years ago
	"rvRjD7L28YA", // 【Crow Country】 Horror Game Where You Are Trapped in a Terrifying Abandoned Theme Park
	"cIEXUtOCwok", // 【Superchat Catch Up】 This kirin is catching up! you better run
	"O8Yq_nk0JdY", // 【Machorium】 Fauna plays a completely normal and not cursed aquarium simulator
	"LQzb-HjIwzE", // 【FAUNA'S DUNGEON】 Forcing holoJustice to play a board game I made up
	"JFSq5UmBPK0", // 【CRAB GAME】 big kirin big collab feat holoEN!
	"pW1WkzahCpc", // 【Wii Sports Resort】 It's 2009 and we're going on vacation
	"AKXS9AnE4d4", // 【THE WITCHER 3】 The Battle of Kaer Morhen | #13
	"GKa7146fECU", // 【Superchat Catch Up】 good ol fashioned superchat reading!
	"pEzw_Yg1U48", // 【Wii Sports】 Kirin plays Wii Sports in the year 2024
	"PnAYQzcFlSE", // 【Nintendo Switch Sports】 Screw the rules I have green hair #mocopi
	"jjcC2-DfKxw", // 【DARK SOULS: REMASTERED】 I'm going to regret this.
	"DwC3fHdtYhg", // 【THE WITCHER 3】 The one where Fauna finishes Act 1 (unless she gets distracted by side quests) | #12
	"ZuZX1TzV6uA", // 【Wario Ware: Smooth Moves】 Hand over your wiimote it's time for Wario Ware!
	"8zg0VybNJRA", // 【ALTF42】 Truly the Dark Souls of Rage Games
	"-tb5EO8qb8w", // 【Withering Rooms】 Truly the Dark Souls of Sidescrolling Horror Roguelites
	"ygj3l072KjY", // 【Nintendo Switch Sports】 3D kirin is here
	"DMjSod40u9U", // 【THE WITCHER 3】 11 days since I last played the witcher, 0 days since I've thought about Yenn | #11
	"CcmREmqw0-Q", // 【Withering Rooms】 Horror Roguelite Where You Are Trapped in Infinite Rooms with Infinite Monsters
	"0YB_jET_U9A", // 【Rusty Lake: Roots】 why is the deer creature always so evil looking | #5
	"NED4JcFFXUg", // 【MINECRAFT】 The legendary Minecraft Saturday
	"KhbvoY6kmT0", // 【WARIOWARE: MOVE IT】 Movin' in 3D! #mocopi
	"5bOxJLfkVXg", // 【House Flipper 2】 Fauna breaks into your house and rearranges your furniture
	"gsJK4M954Bg", // 【Cube Escape Collection】 Sleepy kirin is addicted to puzzle solving | #4
	"9MiOg1xLMpk", // 【THE WITCHER 3】 Don't worry, it's not wine (it's blood) | #10
	"sGeLlsQVcmA", // 【DARK SOULS: REMASTERED】 RACE AGAINST @GawrGura Green POV
	"2t9ELE4QQ3w", // 【Rusty Lake Hotel】 The comfy puzzle game arc continues | #3
	"uQI31gPHKj0", // 【THE WITCHER 3】 Ciris Fauna is here! | #9
	"U-AU66QIo8Y", // 【SHINKANSEN 0】 spot the difference in this haunted train horror game
	"hrFk1O1H0LE", // 【DON'T SCREAM】 The horror game that restarts when you scream I'M DOOMED
	"07XfGKpEr6w", // 【MINECRAFT】 The one where Fauna memorizes 100 digits of pi
	"tlTXwputGgk", // 【THE WITCHER 3】 0% violence, 0% drinking, 0% gwent, 100% gerald | #8
	"ezWJDS4DTWQ", // 【PROMISE HALF ANNIVERSARY】 Forcing #holoPromise to play in my dungeon + ANNOUNCEMENTS & REVEALS
	"bWj_LErnkzs", // 【The Game of Sisyphus】 Let's see what this is all about
	"OArrdtBg2YA", // 【Forklift Load】  WHO LET FAUNA DRIVE THE FORKLIFT
	"Kxh769Q6HzI", // 【Cube Escape Collection】 Nostalgic point and click puzzles part 2!
	"FWQKyCFUG5k", // 【THE WITCHER 3】  Inside you there are two wolves | #7
	"dEU3BjoMaoA", // 【Balatro】 Finally some gambling I can really get behind
	"9exj7V_sQok", // 【Shadows of Doubt】 The Sandbox Detective Simulator Where You Can Do Absolutely Anything
	"wVhNlpwu2hs", // 【MINECRAFT】 My desert. My Minecraft. My dune.
	"9gTC0GBlU0I", // 【THE WITCHER 3】  Fresh haircut fresh fit & fresh triangles | #6
	"MPYXTh36IAM", // 【Cube Escape Collection】 LET ME OUT classic point and click puzzle games!
	"nCr5WCoO3fc", // 【Manor Lords】 Fauna builds the medieval city of your nightmares
	"qI-ZOPIRgP0", // 【MINECRAFT】 We're minecraft guys, of course we build the world tree
	"Gs0ST0Nc1bc", // 【THE WITCHER 3】 Fauna tries to do the right thing and ends up causing untold suffering part 5
	"Q5QpmhZo4CA", // 【Superchat Catch Up!】 Have a cup of tea and get comfy!
	"kDJbCeZm7Rk", // 【THE WITCHER 3】 Fauna is here and she is playing the witcher again | #4
	"zfqoSzt69_k", // 【KU100 ASMR】 Elf ASMR ♡ Whispers in elvish & assorted ASMR triggers to heal your mind
	"XoFB4m0IIo4", // 【THE WITCHER 3】 Which witch is witchier? Witcher or witch? | #3
	"6zsrGJGmRDY", // 【THE WITCHER 3】 Gerald is a fine upstanding fellow and I will not accept slander against him | #2
	"UqOvKVc2PoU", // 【Members Only】 Short kalimba practice!
	"VZpnfemwGDc", // 【CONTENT WARNING】 DON'T DEAD OPEN INSIDE
	"XxQztoDb9rk", // 【THE WITCHER 3】 The adventure begins
	"bjWGWFqqmHE", // 【MINECRAFT】 I made you a golden apple but I eated it
	"amv4Fg3Xqmg", // 【KU100 ASMR】 ASMR for when you need some encouragement ♡ Fluffy triggers & positive affirmations
	"oMA5yAGepEk", // 【Sheepy: A Short Adventure】 Playing a cute & comfy platformer! (members only)
	"whk2hj3fx08", // 【Landlord's Super】 Fauna's a landlord now. Bit sad innit?
	"Jf2d2Of8Jto", // minecraft_monday.wmv
	"pj0CtzBBET0", // 【HITMAN 3】 They put Boromir in Hitman
	"eVZn0wMapog", // 【SLICE & DICE】 The addictive dice rolling roguelite has a new update
	"t1lBMLyfosw", // 【A Difficult Game About Climbing】 I'm going to win.
	"MYb7VcUI5f8", // 【Superchat Catch Up!】 Thank you for an amazing birthday and fes and everything!
	"vLWmHwX4eKQ", // 【🐲 FAUNA'S DUNGEON ⚔】 Birthday Stream!! SPECIAL GUESTS, ACCESSORY REVEALS, & MORE! #Faunjoubi2024
	"I5STCRWuZJY", // 【Twilight: Breaking Dawn Part 2 Watchalong】 THE GRAND FINALE.
	"JmdCpJnM82U", // 【A Difficult Game About Climbing】 a little cheeky post fes pre twilight pre birthday climbing
	"zLPqBX_g9rw", // 【A Difficult Game About Climbing】 This looks familiar.
	"P5KYlZ15JD8", // 【Balatro】 I see a joker right here 👉
	"G7TFPmlwscw", // 【Backpack Battles】 They added new Gooberts to the backpack organizing auto battler
	"WEJOVd-ouJQ", // 【Balatro】 Addictive & Illegal Poker Roguelite/Deckbuilder
	"iLfuHjb-zpg", // 【MINECRAFT】 World Tree's First Birthday Party! 🎂 (Open VC) #anniversatree
	"ABulG8-TeRI", // 【MINECRAFT】 Preparing for the tree's first birthday!
	"TyLN_CNwGG0", // 【Members Only】 Goth Fauna reads Edgar Allan Poe to you
	"V0fhwhH-Iu0", // 【Superchat Catch Up!】 goth edition
	"c0LMyoLrUmo", // 【Pacific Drive】 A spooky road trip through the post-apocalypse (I can't drive)
	"6nxWKoTfmHE", // 【NEW OUTFIT REVEAL】 #GothFauna is finally here 🥀
	"4CucLLFOdK8", // 【MINECRAFT】 It's all Minecraft all the way down
	"WQ6SSldLbVE", // 【HITMAN 3】 ANNOUNCEMENT +The real heartbreak is losing your hardcore freelancer run
	"aW0V_kU0chQ", // The kirin has breached containment #mocopi
	"pS0qyhbAQRo", // 【MINECRAFT】 Super Minecraft Sunday
	"ebiSGJYno3g", // 【Killer Frequency】 Radio host Fauna will save you (maybe) | #2
	"w7jqoGOp4QU", // 【Will You Press The Button?】 Fauna questions life decisions
	"WwAhs9SqBfM", // 【MINECRAFT】 First, it was the spaghetti tree. Now, it becomes the fettuccine alfredo tree.
	"1otZy9RgJFQ", // 【LETHAL COMPANY】 Sweaty gamers meet Lethal Company
	"ZXvz88FNOuA", // 【PALWORLD】 Ceres Fauna in the Bertverse of Madness | EN SERVER
	"eETFCBmC_JY", // 【MINECRAFT】 comfy block game
	"WqdLpkwKWqc", // 【PALWORLD】 Pay no mind to the monkey with a weapon | EN SERVER
	"K4DhqW3vl6o", // 【DOTA 2 COLLAB】 FULL STACK FULL CHAOS
	"lDbn50JR6CY", // 【DOTA 2】 Playing Dota 2 for the first time in 10 years and regretting my decisions
	"Kclso6JKiCg", // 【MINECRAFT】 so we back in the mines ⛏
	"19QvEmJ5KMs", // 【Killer Frequency】 Interactive Horror Podcast Where You Determine Who Lives Or Dies
	"Rp4ogsgEuVs", // 【PALWORLD】 Beloved creature collector but with guns? I can't believe this game is real
	"Tn3uLZdzu8I", // 【NEW YEAR NEW KIRIN】 I'm back!!! + showing off new stuff!
	"k0ReQ0lSoSM", // 【holoEN AMONG US】 dun dun dun dun dun dun dun DU DU DUN
	"qSfDEc9CAU8", // 【after karaoke chats & superchats!】 catching up before my break!
	"WvwymfsCqUc", // 【LETHAL COMPANY】 What are we, some kinda lethal company?
	"bqHAOYTaD28", // 【The King in Yellow: The Mask】 Reading you another spooky story!
	"2NjXXQYtUNY", // 【The Binding of Isaac: Rebirth】 cute game (⌒‿⌒)
	"-lmIBCGLvlE", // 【SIGNALIS】 This game isn't what I thought it was | FINALE [Spoiler Alert]
	"5Zo3UMWY5DM", // 【SIGNALIS】 Fauna Searches For a Wife In a Dystopian Nightmare | #2 [Spoiler Alert]
	"X8VjbU37OBo", // 【PlateUp!】 The Sweaty TryHard Gamers Collab
	"LIsOJ4Z4NE4", // 【SIGNALIS】 Highly Recommended Dystopian Horror With a Cosmic Mystery [Spoiler Alert]
	"FUx2W6FmhH8", // 【HITMAN 3】 Put on the holiday sweater, Agent 47. I'm not asking.
	"o-BQboqee04", // 【Superchat Catch Up!】 let me sing you the sapling rap of my people
	"xJyUkFc721A", // 【PlateUp!】 Fauna plays a co-op game by herself because she's a sweaty gamer
	"xX0_vWRSmYI", // 【HITMAN 3】 IT'S DECEMBER BREAK OUT YOUR FESTIVE SANTA 47S
	"zeb8CIUa0HM", // 【I'm On Observation Duty 6】 Return of this silly and creepy spot the difference horror game
	"ISn7glcSHaA", // 【The Past Within】 Creepy Co-op Puzzle Game with Reine!! #Cereines
	"xrO8ZmUQR0M", // 【Tavern Master】 Tavern Management Simulator of My Dreams
	"0zr549A0Sa8", // 【Members Only】 Let's try making a scuffed animation!
	"y5N41AcU-Ic", // 【DELTARUNE】 Did you know FAUNA is an anagram of NOELLE? | Chapter 2 FINALE
	"J4PbVTCbnds", // 【DELTARUNE】 She's literally me | #3
	"65mbpj7oDFE", // 【DELTARUNE】 The power of fluffy kirins shines within you!
	"qBKyF9_zvb0", // 【DELTARUNE】 Did you know DELTARUNE is an anagram of UNDERTALE?
	"0C9cYUg9dAE", // 【DREDGE】 Put on your fishin' hats, the new Dredge DLC just dropped
	"uUQpAzQuCiI", // 【Backpack Battles】 Handsome Goobert isn't real. He can't hurt you.
	"AI9yq42OBZU", // cursed slime asmr (?) do not watch
	"NfSjpjoHcWk", // 【Backpack Battles】 Cute backpack organizing auto battler!
	"kxy3kBlSnNA", // 【The Stanley Parable: Ultra Deluxe】 Kirin plays this classic mind bending game for the first time
	"tbQvgoCqeog", // 【imomushi】 The Newest Fruit Based Rage Game
	"VqZS0v5S1as", // 【Headbangers: Rhythm Royale】 Rhythm Heaven meets Fall Guys meets Pigeons
	"sc4ldCMaPrk", // 【Superchat Catchup】 I can't read there's too many elephants in the way
	"-jzh6XmiCh8", // 【HITMAN 3】 I will time travel if I have to, I'm getting this punkin suit
	"1pRZIWeRDjs", // 【SLAY THE PRINCESS】 You have to slay the Very Normal princess. Do not believe her lies. :)
	"YA0kRmBVg2M", // 【World of Horror】 Trying out the FULL RELEASE of this addictive horror roguelite!
	"72J-41G2aQc", // 【Super Mario Bros. Wonder】 I heard this game has elephants
	"8qy07dl8Sbc", // 【World of Horror】 Junji Ito inspired horror roguelite crafted with love and terror
	"H33BP_7oc6w", // 【MINECRAFT】 You'll never guess what I'm working on today (open vc)
	"Aj5pmKHIIXc", // 【Dark Gathering Watchalong】 Spooky anime watchalong! Grab your popcorn
	"eissATf7ul4", // 【KU100 ASMR】 Seeking Help From A Strange Healer 👁 [Horror Roleplay]
	"GPVTncKzrlo", // 【AGE OF EMPIRES II】 WOLOLO's your sheep like it's 1999
	"DlIYyU3lxgc", // 【スイカゲーム】 The World's Worst Suika Player Has Logged On
	"gyIruOYntpw", // 【スイカゲーム】 The Fruit Game That Everyone Is Obsessed With
	"crKVMipmcvo", // Creating the definitive household chores tier list
	"fkSc8zoA9TA", // 【PARTY ANIMALS】 Battling HoloEN in silly animal party games!
	"IArgc8j0TMs", // 【MINECRAFT】 Faun it, we build (open vc?)
	"FoEET1LD_8c", // 【NUN MASSACRE】 Beware The Nun in this PS1 styled stealth horror game
	"UfAoEf-qqk0", // 【HITMAN 3】 This banana is playing hardcore hitman freelancer
	"5AwCqnee9Ek", // 【Members Hang Out】 Fall Guys, creepypasta reading, & more!
	"YzFcK0L-W54", // 【NEW ACCESSORY REVEAL】 What kind of ears does a kirin have? #CouncilCapes
	"K7YJuYvT6Ac", // 【MINECRAFT】 IT'S MINECRAFT MONDAY??? (open vc?)
	"28YMsv7FNe8", // 【Superchat Catchup】 This kirin is catchin' up, you better run! (+ secret hitman)
	"sd4yDyOlQWg", // 【HITMAN 3】 Hit em with the ol banana wrench wombo combo
	"aOHFz5WAAlU", // kirin is a puddle
	"d4CLpVz7m4Q", // 【3D SHOWCASE】 Gaming idol kirin in 3D! #3DKirin 🌿
	"ncBdFF5FUK8", // 【STARFIELD】 This kirin slaps you and steals your ship, what you doin'?
	"nkMSqLxHPzM", // 【SUPERCHAT CATCHUP】 Buckle up, Sapling, we're reading a bunch of superchats today!
	"yYaLy_fiiNw", // 【STARFIELD】 Alright Todd, let's see what you got for us
	"_q5BSR9bktw", // 【Nintendo Switch Sports】 Kirin plays switch sports with FULL BODY 3D! #mocopi
	"-p7XP7XAyco", // 【#Faunaversary2023】 Celebrating 2 YEARS of kirin!  #mocopi
	"2xU9qsmIEaQ", // 【Planet Zoo】 I have obtained 200,000 zoo coins through entirely legal means and now I will spend it
	"zHW0lo-Smdc", // kirin on the beach (chatting!)
	"hXk6FE1Ce3o", // 【Hitman: Agent 47 (2015) Watchalong】 We are watching another hitman movie
	"RqFpOnRXNMY", // 【MINECRAFT】 Yes, I'm still working on this big ol tree
	"lkB6zHPxXgA", // 【Amnesia: The Bunker】 B-barney, is that you?! (OFF COLLAB with @HakosBaelz) | #2
	"1Eql5BfKU_s", // 【HOLOCURE】 They added farming to holocure????? (new update spoilers!)
	"3AYhbHQgPrE", // They made those mobile game ads into a real game 【YEAH! YOU WANT "THOSE GAMES," RIGHT?】
	"zz389lBXsVg", // 【Pokémon Unite】 Representing EN in the EN x ID x JP Unite Tournament! #ポケモンユナイト世界大会
	"bilsiV8t8io", // 【Pokémon Unite】 TOURNAMENT TRAINING WITH @IRyS
	"YUcNKKzL404", // 【Planet Zoo】 I bought every single DLC for Planet Zoo
	"FnYyjBlfMDc", // 【Members Only】 Doodling and Hanging Out!
	"BUTS7lHUhzk", // 【Amnesia: The Bunker】 Bae and Fauna play the terrifying new Amnesia game (OFF COLLAB) @HakosBaelz
	"GQl47zhmPe4", // 【Halls of Torment】 Vampire Survivors meets Diablo IV
	"EeNk8sRZpe4", // 【MINECRAFT】 Building the spaghetti tree of your nightmares
	"Hc86zcd4tJw", // 【Kirin in Japan】 Good morning chats from Japan!! おはよう~
	"ZU5G_Tax5Qk", // 【Planet Zoo】 So-called Keeper of "Nature" builds a "zoo" for "animals"
	"FBDDwAn-VaE", // 【HITMAN 3】 I Hired A Hitman To Kill Me With Only A Banana (Real) (Gone Wrong)
	"Ief56kaqRxk", // 【Papa's Freezeria Deluxe】 Summertime milkshake makin' simulator
	"ZML5upxuLgU", // kirin streaming (chats and superchats!)
	"e5BNHpVOp6c", // 【HITMAN 3】 casual hitman with maximum graphics
	"uu73ssSs36E", // 【MINECRAFT】 The one where Fauna finally upgrades her PC after almost 2 years
	"Zkvb0-6Kzo4", // 【THE GETTING OVER IT TRIALS】 Commentary desk hosted by Faunashi-sensei and Ourochimaru
	"_N_m0xqqqMs", // 【KU100 ASMR】 Summer spa ASMR ♡ Water, bubbles, & massage in 3D
	"CAwhWglywvY", // 【SKYRIM】 Kirin who sneaks into your house and steals your sweet roll
	"jAv6NXW0LkA", // 【National Treasure Watchalong】 Saplings, we have to steal the Declaration of Independence
	"y952Zpm290s", // 【Only Up!】 I won't let this game win
	"dtSL7xiFwyA", // 【MINECRAFT】 Fauna builds a wool farm to flood the server with thousands of sheep
	"5vL2lASV9DI", // 【Sonic Adventure 2】 This is the face of someone who treats her chao well | #2
	"HS7iTOkFVJI", // 【Only Up!】 I heard this game is like Getting Over It ( ͡° ͜ʖ ͡°)
	"QPq2KIDW-Pg", // 【KU100 ASMR】 Oil massage & ear cupping ASMR for sleep & relaxation ♡
	"skn2Yr5KyFI", // 【MINECRAFT】 Spore Blossom Hunting!
	"iZCvTJl4xOQ", // 【Sonic Adventure 2】 Kirin relives her childhood in Sonic Adventure 2 | #1
	"PPbahgj17mA", // 【QUESTIONABLE COMEDY DOUBLE FEATURE】 The Master of Disguise (2002) & Austin Powers (1997)
	"lHLx62THuYM", // 【Bread & Fred】 Kronii & Fauna play a (hopefully not) rage inducing co-op platformer
	"Zphd6womnLs", // 【MINECRAFT】 Wait it's actually Monday today?
	"aOUq38wqVgw", // 【BIOSHOCK 2】 Call me big daddy | FINALE
	"1YgU3KUXwqU", // 【GETTING OVER IT】 Faunashi-sensei plays until 100 WINS
	"eQBytqBik1o", // 【MINECRAFT】 Fauna builds a honey farm to flood the server with thousands of bees
	"Swwxuh34LCc", // 【KU100 ASMR】 Softly whispering to you in 3D~
	"7WqOasT4J_k", // 【CouncilRyS RPG】 This game is a love letter and my heart is full (FINALE)
	"3bzdHNiqx74", // 【Members Only Drawing】 Working on art from months ago teehee
	"ijd2FfaLz1w", // 【HITMAN 3】 Kirin tries and fails to get over her hitman brainrot [HARDCORE FREELANCER]
	"85WB3gbHR64", // 【Amanda the Adventurer】 Analog Horror Game Where Amanda Is Here To Help! help me (All Endings)
	"YGjTaLHUJ64", // 【CouncilRyS RPG】 They put me in a video game?!
	"R7nmuCWEYhc", // 【MINECRAFT】 The world tree looks a little small
	"PIK1IgLn57g", // 【BIOSHOCK 2】 Going to pull a Liam Neeson if you don't give me my daughter back | #3
	"LdlNvnvnufc", // 【THE OUTLAST TRIALS】 Surviving with Calli, Kronii, & Gura!
	"g_tJQxpTAsw", // 【Fairytale Reading】 Welcome to my forest, stay a while and listen to some tales!
	"MI1k5uwJQ1E", // 【Superchat Catch Up】 Catching up after break!! Reading supas and chatting the day away
	"JbCar8A_SmA", // 【KU100 ASMR】 Onomatopoeia & fluffy ASMR triggers ♡ Whispers, ear cleaning, brushing
	"uoMWFIJzEc4", // 【MINECRAFT】 Kirin is back! Let's work on the tree!
	"eV1VJKdIaTo", // 【HITMAN 3】 The last thing you see before you perish [HARDCORE FREELANCER]
	"hy9dDExuZ6E", // 【Pro Gymnast Simulator】 Absurd physics based gymnastics simulator
	"S7ZsBiLth0k", // 【Hitman (2007) Watchalong】 there is a hitman movie and we are watching it
	"sPrvL9ZeqWg", // 【KU100 ASMR】 Maid ASMR ♡ Brushing and washing your hair!
	"fgCHZbylmus", // 【MINECRAFT】 My tree shall blot out the sun
	"tby63o5lNwc", // 【SUPER MARIO MAKER 2】 Kirin attempts to create a level from hell of her own design
	"GU_D7HsuwKg", // 【＃ホロライブワールド】 B-LIEVE IN TEAM B!!!! 💪
	"KlZv7R7vzI0", // 【SUPER MARIO MAKER 2】 LAST CHANCE TO TRAIN BEFORE THE TOURNAMENT (Day 2)
	"Puyd1d445IM", // 【SUPER MARIO MAKER 2】 Kirin plays impossible Mario levels to try to get good in 2 days (Day 1)
	"urMWdWlzDCw", // 【OFF COLLAB】 Kronii + Fauna + 1000x Sensitivity Microphone 【KU100 ASMR?】
	"KiGsWBF19RY", // 【DREDGE】 Something isn't right about these waters... (FINALE)
	"uNbwCla63dA", // 【MINECRAFT】 I will actually work on the tree this time
	"LQWcGi3saWQ", // 【BIOSHOCK 2】 They made dads from bioshock into a real thing? | #2
	"tOjds7TSje0", // 【Members Only】 MS Paint doodles and chats!
	"5M71z3InbQU", // 【DREDGE】 I don't have time for you Cthulhu, I have fish to catch.
	"_DiIRc7nYOE", // 【Papa's Freezeria Deluxe】 Serving milkshakes with a side of zoomer nostalgia bait
	"b-md57bDLEQ", // 【MINECRAFT】 FIGHTING THE WITHER WITH FRIENDS (kirin pov)
	"xP74NhPDmHQ", // 【Superchat Catch Up】 this deer is reading superchats (and playing a tiny bit of hitman teehee)
	"dPmIvra5IVA", // 【MINECRAFT】 And so my tree shall consume the world
	"z5I1a90yg8g", // 【BIOSHOCK 2】 Kirin plays BioShock 2 for the first time (scuff warning) | #1
	"3Q_eeVdab0c", // 【Phasmophobia】 I am definitely not scared WITH @KaelaKovalskia
	"rpM8_3h275Y", // 【FAITH: The Unholy Trinity】 UNLOCKING THE TRUE END
	"DEDrhTKODL4", // 【KU100 ASMR】 Soft Whispers & Relaxing Lullabies ♡ Kalimba Playing ♡ Rain Ambience
	"Bkm-RIZ79XI", // 【DREDGE】 You're Trying To Catch Fish But Lovecraftian Monsters Are Hunting You
	"lkvrfn7XoYw", // 【MINECRAFT】 This tree isn't going to build itself, grab an axe, saplings
	"r8oTzos2r3U", // 【HITMAN 3 ENDURANCE】 I WILL BEAT FREELANCER MODE OR PLAY FOR 12 HOURS
	"VvjiSEIg0Ig", // 【Members Book Club & Dome Keeper】 Discussing All Tomorrows and DRILLBERT
	"Afoba1kdJA0", // 【FAITH: The Unholy Trinity】 Do Not Fear, Child, Priestess Fauna Will Cleanse Your Soul
	"ioXaunjUPQI", // 【MINECRAFT】 Behold, the tree of life
	"cs5wgY7GqUs", // 【FAITH: The Unholy Trinity】 Retro Style Horror Game Where Anyone Could Be Possessed By Demons
	"Itvy5AJVhnA", // 【Superchat Catchup】 Reading birthday supas!!
	"HScSUo-vUK8", // 【HITMAN 3】 This kirin has a silenced sniper rifle
	"SqVlUeeZg7o", // 【MINECRAFT】 Who up building they tree rn
	"I577YH2XwAY", // 【NEW??】 Showing you a few new things!
	"Dte5lhiMD7A", // 【BIRTHDAY STREAM】 Birthday kirin on your screen!! #Faunjoubi2023
	"h9sQ4LCH-Ck", // 【Members BOOK CLUB】 Discussing the first half of All Tomorrows! & gaming...?
	"PTIZn0y06Zs", // 【Superchat Catchup】 Let's chat and catch up on supas! (plus a little sneaky hitman)
	"y_lhmFzo5Qc", // 【MINECRAFT】 The tree is not my neck
	"RFY7cRvSpmo", // 【HITMAN 3】 Freelancer mode is just too fun
	"9y3j-ZCy5Lw", // 【KU100 ASMR】 No talking ASMR ♡ Ear blowing, oil massage, ear cleaning ♡
	"Nb3hP1PpfNE", // 【Creepypasta Reading】 Fauna in cave...
	"nxXm14QmdmQ", // 【MINECRAFT】 World tree project IKZ!!!
	"B9wk1OpXlbk", // 【MINECRAFT】 The grind starts now
	"1-5WhjN8yfw", // 【Penumbra: Black Plague】 My Parasitic Brain Worm Can't Possibly Be This Cute! [FINALE]
	"AbZYGMe1YKo", // 【KU100 ASMR】 Bubbly water ASMR for sleep & relaxation ♡ Unintelligible whispers
	"WbbwerxYD6o", // 【Members Fall Guys】 Teletubbies in your Fall Guys lobby? It's more likely than you think.
	"6hv3lcMXqIE", // 【SKYRIM】 When I google Serana all the results are about marrying her
	"vLx1lxTU-EA", // 【HITMAN 3】 Agent Fauna7, your next target has green hair, horns, and... wait a minute
	"oJM1FxYPf2s", // 【Penumbra: Black Plague】 You Are Trapped in an Underground Bunker And All the Dogs Are Gone
	"7m8R6WxgjUE", // 【A Little to the Left】 My organizational skills are unmatched!
	"kjRNYm58PUM", // 【KU100 ASMR】 Squishy & scratchy ASMR ♡ Cat girl ASMR
	"zVZzCLXC4Sw", // 【Euro Truck Simulator 2】 Just a girl, her truck, and her complete inability to drive a car
	"2Ysgvba_0mo", // 【HITMAN 3】 I WILL GET GOOD OR DIE TRYING
	"4W186W1Er8U", // 【Fairy Tale Reading】 Join me in my forest and let me read you some stories~
	"6BgoU0tAQOA", // 【Sail Forth】 This is your captain speaking. I have no idea how to sail a boat.
	"rGfeAxgPBiE", // 【MINECRAFT】 Fauna builds an automatic tree farm (hopefully)
	"5DO_owLCOdA", // 【KU100 ASMR】 You WILL stay here and receive headpats ♡ Yandere ASMR
	"W5_zD05wgho", // 【SKYRIM】 Where am I...?? Where is Faendal???
	"fBYJWytRLLo", // 【Toradora! Watchalong】 TIME TO WATCH THE LAST EPISODE FOR THE FIRST TIME FINALLY
	"UmshV8AfPTQ", // 【MINECRAFT】 I am playing the block game
	"6l5kAq9AbGE", // 【HITMAN 3】 Slapping my way to victory in the new Freelancer mode
	"sPfXJlzDe4c", // 【Penumbra Overture】 You Are Trapped in a Cave With 10,000,000 Spiders and You Can't Pet the Dog
	"dNkrcmA_HzU", // 【Toradora! Watchalong】 Starting the second half of the show!!! What will happen?? #3
	"f8vbfBwpCuU", // 【Pokémon Violet】 Beating the game so I can get a shiny sandwich and get my dang tea cup | #9
	"wS08-NZIkBE", // 【Pokémon Violet】 Fauna spends 6 hours looking for a shiny sinistea and cries | #8 (Not finale...)
	"Vocmgc93sEg", // 【MINECRAFT】 KIRIN MUST BUILD
	"d5ekfuGWtyQ", // 【MINECRAFT】 *kirin joins your new minecraft server*
	"oVmg5ctd4i0", // 【Toradora! Watchalong】 Did you know Tora = Tiger, Dora = Dragon? #2
	"ofIYXrSGm7w", // 【Pokémon Violet】 This is my daughter and she will beat you up | #7
	"xGjR2wiv9Ns", // 【Penumbra Overture】 Kirin Plays Classic Horror Game By Herself and Regrets Her Decisions
	"O54AQHooz9g", // 【Cities: Skylines】 Building The City of Your Nightmares
	"VFPXCxI51Hg", // 【Toradora! Watchalong】 Comfy tsundere watchalong!! #1
	"-5FHkexckEE", // 【Pokémon Violet】 Ara ara, who do we have here? | #6
	"FLagdbvt6CU", // 【Slice & Dice】 Is hard mode impossible?
	"rdMoviDokOg", // 【supa catchup】 jetlagged deer chats and reads superchats 🤓
	"jEWpLaY9Nsw", // 【JUMP KING】 Remember Fauna? This is her now. Feel old yet?
	"GF9IUWePggc", // 【Nintendo Switch Sports OFF COLLAB】 KIRIN LOVES SPORTS (AND OWL AND RAT)
	"YsF5yk-UzLI", // 【Nintendo Switch Sports】 This Kirin challenges you to a game of golf... What do you do?
	"WoiFNXENdaM", // 【SKYRIM】 Do NOT feed the Kirinborn
	"IAGJ8lYl_5E", // 【ASMR】 Fluffy ASMR to heal your soul ♡ Ear cleaning & positive affirmations
	"s9hKu0QCrHA", // 【Pokémon Violet】 Lass Fauna wants to battle! | #5
	"d0Ptfdfbu4k", // 【Nintendo Switch Sports】 You dare challenge me?
	"-9qaEobN5-8", // 【NEW OUTFIT REVEAL】 Casual Fauna is here!! Come see my new clothes!
	"-x1XoANfQAA", // 【Members Only Dome Keeper】 NEW UPDATE NEW DOMES
	"5-YcViiggI8", // 【Slice & Dice】 Dice Rolling, Dungeon Crawling Indie Roguelite!
	"cPLm5chgYlA", // 【Pokémon Violet】 I'd like my bread dog with extra cinnamon please | #4
	"omtWlnL0fh4", // 【BIOSHOCK】 Kirin beats BioShock!! | FINALE
	"x_MxTehdZr4", // 【PHASMOPHOBIA】 Fearless & Fearful vs Ghosts
	"ueqzQJ45tvM", // 【The Eminence in Shadow: Master of Garden】 Drawing a cute girl & rolling gacha!
	"ecEjDJUVq4I", // 【MINECRAFT】 WITHER FIGHT PREPARATIONS with KIWAWA!
	"ayeg9CFlaJA", // 【ASMR Roleplay】 Healing ASMR from the Forest Witch ♡
	"Oa4G7reH6qw", // 【Pokémon Violet】 This is my emo son and I still love him | #3
	"xoZNrulIjwU", // 【AMONG US】 EN x ID Among Us!! Green POV
	"dFlii9331nw", // 【Members Only】 Drawing GOTH FAUNA 💀🥀
	"vPdBeQ_datw", // 【Pokémon Violet】 Just me and my green beans | #2
	"4yE0K9txO9E", // 【MINECRAFT】 building a snowy village trading hall ! (with open vc!)
	"iiIjY7WzenA", // 【ASMR】 Tingly Tapping & Onomatopoeia ♡ Soft Whispering
	"edpZ73Y5cp4", // 【BIOSHOCK】 You WILL give me your ADAM | #2
	"61uOo0FRpmk", // 【Pokémon Violet】 Late night Pokémon adventures | #1
	"TYbC4iDAhzw", // 【Trombone Champ】 The Greatest Rhythm Game of All Time
	"7miPBBDFh4g", // 【BIOSHOCK】 Kirin plays BioShock for the first time | #1
	"CVheQU-PA50", // 【MINECRAFT】 *eats your golden apple*
	"Oz8Y4o1ESRg", // 【hi】 let's catch up!
	"mpdQxyCvFME", // 【The Mortuary Assistant】 REVENGE! WE WILL FINISH 1 SHIFT (ft. moral support??)
	"oT5WJfMM9cc", // 【Free Solo Watchalong】 Watching the scariest non-horror movie I know
	"JkzIfK7Tmtk", // 【ASMR】 C'mere! Let me test new ASMR triggers on you~
	"Lmjg-GD4d_8", // 【Taste Test】 SNOT Reviews Halloween Snacks
	"pkqlW1drD5g", // 【Vampire Survivors】 NEW UPDATE NEW VAMPIRES
	"G9oEIz4HVkY", // 【Amnesia: The Dark Descent】 FINALE with BAE ! alexander you better watch out
	"hC7RIVZ6W38", // 【ASMR】 Whispering to you ♡ comforting ASMR for sleep & relaxation ♡ rain ambience
	"E_d89wb3p2U", // 【Fall Guys】 LET'S WIN with HAACHAMA, BAE, & MUMEI
	"M2GvDo_EucI", // 【The Twilight Saga: New Moon】 WATCHALONG WITH AWOOMEI
	"NqyBkCZFPaw", // 【Members Only Dome Keeper】 no dome keeper addiction here
	"5CrzouBTg3I", // 【Dungeon Munchies】 Monster Girls Eating Monsters
	"YEOyPPGyka4", // 【Amnesia: The Dark Descent】 LET THE REAL SCARES BEGIN with BAE
	"g6pOwxQVMyA", // 【Civilization V】 Nice civilization you got there...
	"Ts_SHcaVDjg", // 【ERASED Watchalong】 LET'S FINISH
	"YTgWRGMqtlo", // 【Dome Keeper】 Indie Roguelite Where You Must Protect Your Dome From Aliens Or Else
	"DaG38dShdGE", // 【Amnesia: The Dark Descent】 CLASSIC HORROR GAME WITH BAE
	"t6LYeCm-Ghs", // 【ERASED Watchalong】 Mystery Anime Watchalong!
	"Q46HMWMAvZU", // 【Assassin's Creed IV: Black Flag】 YO HO or YOOHOO? [FINALE]
	"H5jE8vWzDcU", // 【DRAWING HALLOWEEN COUNCILRyS】 Alice in Wonderland Version!
	"LAyK2U5Q0cc", // 【The Mortuary Assistant】 I am already terrified (feat. BAE & heartrate monitor)
	"yPFKdL0zjg0", // 【Assassin's Creed IV: Black Flag】 Being a Pirate is Alright with Me 🏴‍☠️
	"EYPHpmgRInY", // 【DRAWING HALLOWEEN COUNCILRyS】 IT'S SPOOKY MONTH 🎃🦇🍭
	"0xDc-WvMR4U", // 【Civilization V】 Taking Over the World One Sapling at a Time
	"Tm6aX07cuaY", // 【Variety Gaming】 what the kirin doin
	"feHwawnqgYo", // 【Assassin's Creed IV: Black Flag】 Come sail away ⛵
	"FuhM-356UOY", // 【Fall Guys】 New season!!
	"q5LRMBtQOGE", // 【Death Road to Canada】 Taking HoloEN to Canada!
	"y5-Zgwf4r9o", // 【Night Delivery】 Working Very Normal And Not Haunted Delivery Jobs
	"DBX6lfmydeo", // 【MINECRAFT】 Villager Management Simulator
	"-zsyEoCPhbQ", // 【SKYRIM】 NOOOOO DON'T SEND ME TO SKYRIM PRISON I'LL GIVE YOU YOUR SOUL BACK
	"4I4V5_xJ-qI", // 【Members Only】 Drawing Goth Fauna 🩸
	"fO13arQBv1k", // 【Sucker for Love: First Date】 Please Let Me Date the Eldritch Catgirl
	"caxMMMuYR14", // 【MINECRAFT】 World is Mine
	"OFEc6KLDxVQ", // 【Cult of the Lamb】 Will you join my cult?
	"9vE2rOGkaao", // 【HoloCure】 New Update !!!!!!
	"jJ77o-DKfKc", // 【Super Auto Pets】 🐖 Cute & Addictive Auto Battler That I Don't Know How to Play 🐢
	"ZM3zgRL7J6w", // 【MINECRAFT】 Building a Raid Farm to Gain Infinite Emeralds and Destroy the Economy (Part 3)
	"IhPqyyjYugs", // 【MINECRAFT】 Building a Raid Farm to Gain Infinite Emeralds and Destroy the Economy (Part 2)
	"hYzj3ElzBLQ", // 【HITMAN 2】 Return of the Slap King
	"h3yP51Lc8Ds", // 【Brainstorming & Drawing】 Thinking for ideas for ASMR(?) videos!
	"hxkdFMre7AE", // 【MINECRAFT】 Building a Raid Farm to Gain Infinite Emeralds and Destroy the Economy (Part 1)
	"c4fAF2N9R_s", // 【TWILIGHT WATCHALONG】 hold on tight, spider monkey with MUMEI
	"tiDeLV3y1SI", // 【superchat time!】 sleepily reading many superchats !
	"3AfOaPzcc2E", // 【MINECRAFT】 sleepy building 🌙
	"bmZ3m0gfvJA", // 【1 YEAR ANNIVERSARY】 12 HOUR MARATHON STREAM with collabs, batsus, & more! #faunaversary
	"5-9YHKhP2lY", // 【Nintendo Switch Sports】 IRyS VS FAUNA SWITCH SPORTS BATTLE OF THE CENTURY
	"02hUw815DG0", // 【MINECRAFT】 ID Server Tour with Kaela!! Is this Disney World?!?
	"BItZTYknlA8", // 【Singing Practice】 Practicing JP Songs! (archived)
	"spR0fEp77KM", // 【Spooky's Jump Scare Mansion】 Just 500 more rooms...
	"SfB7x-j4siY", // 【Kirby's Dream Buffet】 Kirby but it's Fall Guys + Mario Party + POYO???
	"9jvWCSawPbI", // 【superchat time!】 cowfauna reads superchats
	"uzqh7exCbtU", // 【RUST】 How do I play again??
	"LhbzlyeGzOw", // 【MINECRAFT】 Finishing Fauna's Funny Fish Farm
	"6Ca74T5kXMs", // 【MINECRAFT】 The one where I try to build a guardian farm for almost 7 hours
	"WAoJ3Wamd9k", // 【Assassin's Creed IV: Black Flag】  A PIRATE'S LIFE FOR ME  🏴‍☠️
	"4evY1uS8TVM", // 【FORTNITE】 we like fortnite
	"MepLJBsgsQ4", // 【Members Only Drawing!】 Can we finish the summer art before summer ends?
	"SxKUDyg-jBU", // 【Spooky's Jump Scare Mansion】 Jump Scare me... I dare you...
	"6hTpQu56Rvw", // 【MINECRAFT】 ELYTRA HUNTING
	"6fDPM-WFOAc", // 【chat & super chats!】 let's hang out!
	"oBrIeqHqkoc", // 【RUST】 I don't know what I'm doing (◕‿◕)
	"gqxiQbFk_gs", // 【Move or Die】 PARTY GAME INSANITY
	"ULpvXU9FEiM", // 【Stray】 This game better have a happy ending or else | FINALE
	"vpWsXk4fqqA", // 【KU100 ASMR】 Summer Spa Treatment ASMR ♡
	"5W94amtdoDY", // 【Members Hang Out!】 Chatting and GAMING ?! (Fall Guys?)
	"QK51RgbyXVA", // 【Stray】 Can I pet every cat?
	"8ytiNeSr4_o", // 【ENDER DRAGON FIGHT】 where were you when ender dragon is kill
	"_CetpLFbv3E", // 【MINECRAFT】 SAUNA Renovations 💛💚
	"792giWnMJxc", // 【FALL GUYS】 Wins Only
	"Zu9NZyX3mPE", // 【MINECRAFT】 Fau Fau Lives
	"v6X43Mv1Q3Q", // 【HoloCure】 Luck Be A Lady
	"5FBju8a4kqI", // 【chat & superchats!】 how ya been?
	"MU0KRy-Nb0U", // 【KU100 ASMR】 Comfy Oneesan ASMR with Rain Ambience ♡
	"foYdk4K2I6o", // 【Kirby 64 ENDURANCE】 Playing Until I Beat the Game with BATSU WHEEL
	"_I4I4qDPI9s", // 【SKYRIM】 puts your soul in a gem
	"qQKVfKahHQU", // Ranking Animals By Their Power Levels
	"L0vIAo8kAuI", // 【HoloCure】 I Heard I'm OP In This Game
	"ygSTyUkQjaE", // 【Miitopia】 Turning Myth Into Cursed Miis
	"C1HQmunNVUY", // 【Members Hang Out!】 Comfy chats and drawing!
	"qZxCHs-ulw0", // 【MINECRAFT】 Gearing Up
	"E7AR3v0yJUg", // 【I'm on Observation Duty 5】 DON'T LOOK At This Spot The Difference Horror Game
	"jFcMKmvoAS0", // 【MINECRAFT】 Kirin Builds A Lighthouse
	"aPv95CldJWI", // 【Miitopia】 I Am Not Building A Harem In Miitopia
	"iNDuEV86ddI", // 【PROPNIGHT】 You better hide...
	"y_5rE1h07FU", // 【Minecraft】 Golden Apple?
	"F8SGxi0rEzA", // 【DEEEER SIMULATOR】 I AM D̶E̶E̶R̶ KIRIN
	"Qf8ZFqvSONk", // 【IRON LUNG】 Terrifying Ocean Exploring Horror Game
	"SLozyU10Sng", // 【Minecraft】 Late night, soft spoken, & comfy Minecraft 🌙
	"zDlhaHtMG_4", // 【Miitopia】 Who will we turn into a cursed Mii today?
	"_5UA-JFgE3A", // 【Assassin's Creed IV: Black Flag】 What will we do with a drunken sailor?
	"SlG86-1vCSQ", // 【KU100 ASMR】 Oil Massage ASMR For Sleep & Relaxation ♡
	"FEW47e5ONHk", // 【Members Hang Out!】 hi hello konfauna
	"81CIA9Cg2oE", // 【PACIFY】 SCARY GAME + CUTE KOHAI = ???
	"iEgsJ7825Ro", // 【Miitopia】 CUTE or CURSED? Making CouncilRyS Miis
	"COBL8itTgUk", // 【Members Only】 Let's hang out!
	"uJ58YmnOWZM", // 【Nintendo Switch Sports】 Strap in your joycons, it's switch sports time
	"fn3160421c0", // 【PEGLIN】 I'm already addicted to this peggle inspired roguelite
	"Nz_BuFcT27Y", // 【Catch Up & Catch Up】 Saying hi & reading supas!
	"1-LklmsqUv4", // 【NOT ASMR】 yes collab #kronfaumei
	"TXFR_Mrby7k", // 【Knightfall】 The Only Battle Royale with Horse Drifting (ft MUMEI)
	"SijP1rcoI2M", // 【Nintendo Switch Sports】 playing sports to fuel my virtual clothing gacha addiction
	"CGPPOzZNIyE", // 【KU100 ASMR】 soap, bubble, & fizz ♡ bubbly ear massage ASMR for sleep & relaxation
	"QAMuo4cqXAc", // 【Song Release After Party】 AHHHHHHH
	"xW-s3IWKWDA", // Making My Definitive Desserts Tier List
	"kg-pshICjP0", // 【Members Doodle & Chat!】 quick members chat!!
	"Aa-VX6AKJsg", // 【Nintendo Switch Sports】 SPORTS KIRIN
	"bN033vXoEpU", // 【Assassin's Creed IV: Black Flag】 WEIGH HAY AND UP SHE RISES
	"KCXcWOA50hc", // 【KU100 ASMR】 rain & soft whispering ♡ ear cleaning & oil massage
	"6wz61DsUYvw", // 【Hypnospace Outlaw】 I saw your browser history, you're under arrest for 90s internet crimes
	"x34Lc7FBwbE", // 【MINECRAFT】 comfy building! (with open vc if anyone is around)
	"OqLPuJVqWZw", // 【SKYRIM】 short skyrim stream!!
	"EMlS04prz4o", // 【Superchat Catchup】 Reading superchats and... playing something after!
	"uwxRUzBFUKY", // 【SKYRIM】 It's SKYRIM SUNDAY
	"daLziJnhGkQ", // 【Assassin's Creed IV: Black Flag】 Sea Shanties Unlocked
	"6OEf1BlCwqY", // 【The Convenience Store】 You are not alone...
	"yKrnnCuGx38", // 【Members Drawing!】 Let's draw... something!
	"slkP9n3f7O0", // 【Jump King】 Jumping for her...
	"dwohGrS6z1s", // 【Assassin's Creed IV: Black Flag】 AHOY MATEYS 🏴‍☠️
	"MYAW3cRG9UA", // 【SKYRIM】 Turning My Skyrim Follower Into a Dark Lord Simulator
	"sm7GjAaZdzY", // 【Townscaper】 Building My Kingdom! 👑
	"AxZvGEsvguw", // 【DEVOUR】 oh no (oh yes)
	"qva_YiAQgYM", // 【Vampire Survivors】 Current Objective: Survive
	"dkeK2jMD3sE", // 【Friday Night Funkin'】 Another game, another babe
	"_NUY48Etomo", // 【KU100 ASMR】 whispering to you ♡ rambling & assorted ASMR triggers
	"1cGxcaFkscg", // 【Superchat Catch Up】 Relaxing and rambling and thanking you!
	"NyIqYW0r_5w", // 【Clubhouse 51】 KIWAWA vs FAWNA 🐔🌳
	"F22x9_SYIhs", // 【Vampire Survivors】 New vampires just dropped??
	"F8urfN_cGWA", // fauna is not prerecorded
	"SzAOQ8BAGdg", // Making My Definitive Fruits & Vegetables Tier List
	"_4Adt7KUaqM", // 【Escape Simulator】 Let me out! Let me out!! #CeReines
	"c7m9H7FBa0s", // 【Ghibli Watchalong】 Whisper of the Heart!
	"SIU9OarHD4U", // 【Kirby and the Forgotten Land】 poyo... or else 🔫
	"DhqESe4je2M", // 【THE CLOSING SHIFT】 Someone is watching...
	"1gBvxOgGDCc", // 【Hope & Council April Fools】 What's this???
	"R6NoFwYwNFA", // 500 ara aras for 500k
	"sftmYjr0sW0", // 【MARIO KART 8DX】 coconut mall
	"NdNrIUObnTE", // 【Blue Archive】 s-swimsuit update.... swimsuits.....
	"2cBWsM329r0", // 【Kirby and the Forgotten Land】 new kirby just dropped
	"mevAoy37kI0", // 【Birthday Supas!】 Chatting & Catching Up!
	"_1MEL3P4_1E", // 【BAD END THEATER】 Choose Your Own Bad End
	"dw6qeolYvJs", // 【doodle & chat!】 How you doing?
	"hERNqA5UWBs", // 【FAUNA'S BIRTHDAY PARTY】 You're invited!! 💌 #Faunjoubi2022
	"4lpHV4Co8-4", // 【Supa Reading!】 Let's chat and catch up!
	"T7HY8ExrmRo", // 【GOLDEN POT ENDURANCE】 Streaming until I get the golden pot! with CHALLENGES & BATSU GAME
	"NtdAccA0isI", // 【Jump King】 Never give up... It's not too late to get some practice in... #holoJUMP
	"u7iGhAmKNsQ", // 【Escape Simulator】 Zero (Chance of) Escape Simulator? #CeReines
	"0aATokqOzZE", // 【Ghibli Watchalong】 The Cat Returns!
	"heCzt7vCc04", // 【JUMP KING】 Must... Get better...
	"DzghDpEVfC4", // 【Vampire Survivors】 what if we played vampire survivors in the middle of the night haha
	"IpRMNPdH-Po", // 【KU100 Manga Reading】 catmaid nya!
	"qtF8DUfTSBk", // 【KU100 ASMR】 Healing water ASMR ♡ Fauna's Apothecary for sleep and relaxation 💤
	"TAoqOMeEryo", // 【SKYRIM】 da da dun da da dun da da dun dun dun DUN
	"8DR9J1D3GH0", // 【Fall Guys】 no grabbing edition °◡°
	"HRYpSCAc4qM", // 【Vampire Survivors】 Become Bullet Hell
	"PBE0dOAtNK4", // 【Sucker For Love: First Date】 Eldritch Cutie Simulator
	"8FX-IpFFXA0", // 【Mario Kart 8DX】 zoooooooooooooom!
	"vehO2Ok5sQg", // who? fauna
	"Ylwahhz2a_U", // WHO????
	"63PNWDDpdQM", // 【SKYRIM】 so you're finally awake...
	"ZZewIRQ7lQI", // 【Chocolate Tasting! 🍫】 Happy Valentine's Day! Let's eat chocolate together! 💝
	"rnMyKoE3CAo", // 【Pokémon Legends: Arceus】 hand over your (poke)mons ✧ #3 (and getting over it haha)
	"s9oJEJet1dA", // 【Superchat Reading】 non-plant reads superchats! #holoCouncil
	"iH5jFLqzgfc", // hanging out! #holoCouncil
	"IhN7AAOX2eg", // 【ASMR】 KU100 ♡ onomatopoeia ✧ ear cleaning ✧ whispers ♡ For sleep and relaxation 🌿 #holoCouncil
	"XAAWppcxyRU", // 【Pokémon Legends: Arceus】 comfy late night pokemons #holoCouncil
	"34SYKE0iBHI", // 【ASMR】 KU100 is here! Be my test subject~ #holoCouncil
	"zpkhKs1qytU", // 【Resident Evil 7 END OF ZOE】 LET'S FINISH THIS (for real this time) #holoCouncil
	"y_2FG2zM4Mw", // 【Pokémon Legends: Arceus】 Starting our adventure! #holoCouncil
	"43uVLZsPkBs", // 【Members Zatsudan】 oops all tangents #holoCouncil
	"d8X-GPqqm-A", // 【Subnautica: Below Zero】 "Relaxing" Ocean Adventure :) #holoCouncil
	"PD2LnnBBkuk", // kirin streaming #holoCouncil
	"xw23rwZ038A", // 【Mario Party Superstars】 It's party time!! 🍰 #holoCouncil
	"-RIbQVhArzw", // 【JUMP KING】 Time to Suffer? #holoCouncil
	"ronEFZPwxqc", // 【MINECRAFT】 minin, craftin, n fishin WITH REINE #holoCouncil
	"SKDcj-T5aGA", // 【Watchalong】 Komi Can't Communicate FINALE #holoCouncil
	"SGUWR36n3pk", // 【SUPA CATCHUP】 reading kimono supas and definitely not doing anything else! #holoCouncil
	"Sh7aHxDuhm0", // 【Watchalong】 Komi Can't Communicate #holoCouncil
	"qMX5bpT5FmA", // 【HOUSE FLIPPER】 Your Sparkling Maid is Here! #holoCouncil
	"DNhPtuL_VQ4", // 【KIMONO COLLAB】 Council Plays PICTIONARY #HoloENKimonoRelay
	"j-xC8cYxFbw", // 【NEW OUTFIT REVEAL】 Kimono Kirin! #HoloENKimonoRelay
	"f-ETZDJXWcs", // 【SKYRIM】 skyrim my beloved 💖 #holoCouncil
	"OsB-eCzT7Sk", // 【Resident Evil 7 DLC】 the monsters don't stand a chance #holoCouncil
	"xEUEAIiIga0", // 【ASMR】 Relax with Ear Cleaning & Oil Massage ASMR 🌿 #holoCouncil
	"00uSzJUIk-M", // 【Members ASMR】 Catching up with a relaxing trigger assortment~ 🌿 #holoCouncil
	"0n_TX8x5nUM", // 【HITMAN 2】 pass a fist #holoCouncil
	"BKHntL-SqPU", // 【Getting Over It】 BUT FASTER (& supa catchup) #holoCouncil
	"uJ3zIWp9_eA", // 【Mario Kart 8DX】 Kirin & Shark Training #holoCouncil
	"ll1YbRVAWWU", // 【Kalimba】 Playing my kalimba for you~ Relax and listen! #holoCouncil
	"wxtfVPurW2w", // 【Merry Christmas!】 Making Presents for Saplings 🎁 #holoCouncil
	"L30zTyxZ8mo", // fauna online
	"oOEt0yiFOj8", // 【Kalimba Practice】 Playing my kalimba for you! #holoCouncil
	"Dtupys1isYc", // 【Getting Over It】 STREAM DOESN'T END UNTIL I WIN #holoCouncil
	"VDuR1CR_oWg", // 【Mother Simulator】 This should be easy, right? #holoCouncil
	"R4Ok-fuieG8", // 【SKYRIM】 skyrim brain #holoCouncil
	"b4DYJ7-1IQA", // 【Watchalong】 Komi Can't Communicate #holoCouncil
	"E4-UA1p9j3k", // 【MINECRAFT】 kirin go fast #holoCouncil
	"_H0wHfkW8Fc", // 【Getting Over It】 I'm over it alright (+ reading superchats after!) #holoCouncil
	"iNaikBJ69Wo", // 【ASMR】 Warm & Cozy Ear Cleaning & Oil Massage 💗 #holoCouncil
	"Je2qfQco_fQ", // 【SKYRIM】 You can't stop the Dovah-Kiirin #holoCouncil
	"ggOc3Zw-tRA", // 【PHASMOPHOBIA】 Hunt ghosts or hunted by ghosts? #holoCouncil
	"b_BOq-zYXn8", // 【Members ASMR】 Relaxing and chatting with ASMR~ 🌿 #holoCouncil
	"tVjI7AGLel8", // 【HITMAN 2】 slap to kill #holoCouncil
	"G03BACaqQso", // 【MINECRAFT】 NEW UPDATE EXPLORATION #holoCouncil
	"c5mFk8MlPe4", // 【Resident Evil 7】 Emotional Support Rat (& Surprise Council) #holoCouncil
	"to-mArQJQTI", // 【Fauna's ASMR】 Whispering & Assorted ASMR Triggers 🌿 #holoCouncil
	"J-5k266uDQ0", // 【Watchalong】 Komi Can't Communicate #holoCouncil
	"3ylbztj1n2M", // 【Duolingo】 I AM STUDYING JAPANESE #holoCouncil
	"XhizcDi6cc8", // 【SKYRIM】 FUS RO FAU #holoCouncil
	"18aV4b2ziSE", // 【Pokemon: Shining Pearl】 except I only use grass pokemon #holoCouncil
	"0q-SU2i8n4o", // 【Mini Motorways】 comfy city planning with a comfy kirin #holoCouncil
	"JngX4p9VD8g", // 【Resident Evil 7】 Calling for backup... send help #holoCouncil
	"7cRWumoiTts", // 【SKYRIM】 I AM THE KIRINBORN #holoCouncil
	"13pcZd4HtTY", // 【Fauna's ASMR】 Rambling to you~ My favorite ASMR triggers 🌿 #holoCouncil
	"r4c3VBijyjg", // 【60 Seconds!】 Surviving a nuclear apocalypse #holoCouncil
	"ZWU6_j82wGU", // 【Chatting & Reading Supas】 Early stream ⛅ konfauna! #holoCouncil
	"-KqJgikUz-0", // 【Members Fall Guys】 You won't grab, right? (◕‿◕) #holoCouncil
	"W6yVqWyrl9g", // 【Getting Over It】 I was too scared to play RE7 so we're climbing a mountain instead #holoCouncil
	"KQpa2XdMV9Y", // 【HoloEN】 HAPPY HOLOWEEN #holoCouncil
	"3zMbzUW3iNQ", // 【Fauna's ASMR】 Relax with Ear Cleaning & Oil Massage 🌿 #holoCouncil
	"vx4063itoJk", // 【konfauna!】 chatting & catching up on superchats! #holoCouncil
	"XKO-SNO6Wys", // 【Dead by Daylight】 mom says it's my turn to be the killer #holoCouncil
	"XYmyCjTGDRs", // 【DEVOUR】 mogu mogu #holoCouncil
	"A2N4bHeWleY", // 【PHASMOPHOBIA】 Life, death, rebirth, and chaos walk into a haunted house #holoCouncil
	"HuXDcwUflJU", // 【HoloEN Among Us】 It wasn't me (◕‿◕) #HoloENAmongUs #holoCouncil
	"t2KcnW92P5k", // 【Fauna's ASMR】 Washing Your Hair ✿ Fauna's Hair Salon #holoCouncil
	"N-FazGH3pMc", // 【Members ASMR】 Chatty and Cozy ASMR 💚 #holoCouncil
	"ZdHCf5NLmZ0", // 【MINECRAFT】 go fast #holoCouncil
	"G9X3d81EKeI", // 【Animal Crossing: New Horizons】 NEW ISLAND START #holoCouncil
	"y1wSldQMjI8", // 【Fall Guys】 Let's fall... together! #holoCouncil
	"-YdluR5bn1Y", // 【Mario Kart 8DX】GOOWA FWANA RACING #holoCouncil
	"9LKLH0PvZNg", // 【Members Watchalong】 Kiki's Delivery Service! #holoCouncil
	"8tDW1_yKSbs", // 【Halloween Drawing】 Which Fauna? Witch Fauna! #holoCouncil
	"j4W89RXpFbI", // 【Resident Evil 7】 I am very bad at horror games #holoCouncil
	"xygdPAO_kZ0", // 【hello】 chatting & reading supas & showing you my minecraft house #holoCouncil
	"QQ_zix6K5qw", // 【MINECRAFT】 Fauna is SPEED #holoCouncil
	"bqGsIflAilo", // 【Members' Stream】 Halloween Doodling & Chatting! 🎃 #holoCouncil
	"TLZPeOw1eAI", // 【Fauna's ASMR】 Comfy Ear Cleaning, Oil Massage, and ASMR Triggers by Fauna 💚 #holoCouncil
	"aAVF7h4-CgI", // 【Equilinox】 Watching grass grow but I am the god of the universe #holoCouncil
	"MnDA6_p7nQw", // 【MINECRAFT】 crafting with sleepy fauna #holoCouncil
	"2QDRjSb5Ofo", // 【Fauna's ASMR】 Healing Headpats & Hair Brushing #holoCouncil
	"UUjskNTdiok", // 【Superchat Reading】 Let's catch up! #holoCouncil
	"uC6emG9xSJI", // 【Members Only!】Drawing a Council Sleepover 💚 #holoCouncil
	"oRN_5TPDdhI", // Defusing bombs with Kronii but we can only speak in ASMR #holoCouncil
	"37RTWhBm_wk", // 【Membership Unlocked!】 Mini KARAOKE to Celebrate 1 Month #holoCouncil
	"u0YT-0cxkZA", // 【SPORE】 conquering space with the power of love and exercise #holoCouncil
	"C-8XCngUD5s", // 【Ib】 Nostalgic RPGMaker Horror... I won't be scared!! #holoCouncil
	"2hgwPt5kmZc", // 【Fauna's ASMR】 Cozy Autumn ASMR 🍂 Crinkley & Comfy #holoCouncil
	"5BKM6UwOguU", // 【MINECRAFT】 Speedrun Practice!!! #holoCouncil
	"j6RkC8hlaMk", // 【Fauna's ASMR】 Ear Cleaning, Oil Massage, & Comfy ASMR Triggers 🌿 #holoCouncil
	"c31slp86BVA", // 【MINECRAFT】 building my kirin house 🌿 #holoCouncil
	"au52DD_SaWg", // 【SPORE】 Scilicet, Civilization was formed (and corrupted by nature) #holoCouncil
	"QM2DjVNl1gY", // 【MINECRAFT】 Adventuring with Mumei! #holoCouncil
	"07OGC-EtBas", // 【Mario Kart 8 Deluxe】 Let's race together!! 🏁 #holoCouncil
	"aWx7zLf6CSo", // 【SPORE】 The Not Pickle Strikes Back #holoCouncil
	"0FBq9C52M4Y", // 【MINECRAFT】 SAUNA #holoCouncil
	"XaN_gNbT6Xo", // 【Superchat Reading】 Superchat Reading 2: Electric Boogaloo (can Fauna make it through?) #holoCouncil
	"8-rKCWmlfJw", // 【Fauna's ASMR】 Relaxing with Cooling Summertime ASMR 🧊 #holoCouncil
	"EMSLvLGWGaw", // 【Superchat Reading】 Thank you ;v; 💚 #holoCouncil
	"3Tn2XhYMWpw", // 【COUNCIL MEETING】 Important council business... JACKBOX PARTY GAMES #holoCouncil
	"3ylyjrzsBss", // 【Plug & Play】 Top right game for a top right idol! #holoCouncil
	"ztuyKI3yHj0", // 【SUPERPARTY】 🍾 Drinking and reviewing memes & fanart to celebrate superchats! #holoCouncil
	"eufkdjY4HyM", // 【Passpartout】 I AM AN ARTIST #holoCouncil
	"aeOY4j8KSAo", // 【MINECRAFT】 Learning to SPEEDrun!! Slowly... #holoCouncil
	"C2R6zHNePhg", // 【Pokemon Unite】 nontoxic MOBA gaming  #holoCouncil
	"le9AAt8B5Gc", // 【ASMR】 Fauna's first ASMR stream! 🌿 comfy whispers and assorted ASMR triggers  #holoCouncil
	"dqtrM2o4BnU", // 【DON'T STARVE TOGETHER】 Surviving in the wilderness with Mumei! #hololiveEnglish #holoCouncil
	"nQO56Kt-AUo", // 【SPORE】not cursed life-simulation #hololiveEnglish #holoCouncil
	"x55Sskx7QCc", // 【Zatsudan Q&A】Let's chat! 🍵 #hololiveEnglish #holoCouncil
	"iICu7NcUK4o", // 【DEBUT STREAM】Mama Nature 🌿 #hololiveEnglish #holoCouncil
];
