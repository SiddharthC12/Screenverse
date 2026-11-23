# scripts/build_reviews.py
import json
import os

with open(os.path.join("src", "data", "movies.json"), "r", encoding="utf-8") as f:
    movies = json.load(f)

# Fictional reviewers bank with avatars/initials
reviewers_bank = [
    {"name": "Alex Morgan", "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80", "initials": "AM"},
    {"name": "Daniel Carter", "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80", "initials": "DC"},
    {"name": "Sophia Bennett", "avatar": "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80", "initials": "SB"},
    {"name": "Ethan Brooks", "avatar": "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80", "initials": "EB"},
    {"name": "Olivia Parker", "avatar": "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80", "initials": "OP"},
    {"name": "Ryan Mitchell", "avatar": "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&w=120&q=80", "initials": "RM"},
    {"name": "Emma Wilson", "avatar": "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=120&q=80", "initials": "EW"},
    {"name": "Noah Anderson", "avatar": "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=120&q=80", "initials": "NA"},
    {"name": "Maya Patel", "avatar": "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80", "initials": "MP"},
    {"name": "Vikram Rao", "avatar": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80", "initials": "VR"},
    {"name": "Ananya Iyer", "avatar": "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&w=120&q=80", "initials": "AI"},
    {"name": "Sarah Jenkins", "avatar": "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=120&q=80", "initials": "SJ"},
    {"name": "Lucas Wright", "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=120&q=80", "initials": "LW"},
    {"name": "Kavita Nair", "avatar": "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=120&q=80", "initials": "KN"}
]

# Specific custom tailored reviews for all 70 films
tailored_reviews = {
    "the-dark-knight-2008": [
        ("A Monument in Modern Superhero Cinema", "Heath Ledger's performance as the Joker transcends the comic book medium entirely. The moral tension between order and chaos gives this crime epic a weight that still feels unmatched.", 9.5, "2024-01-14"),
        ("Exceptional Pacing and Grounded Grittiness", "Wally Pfister's cinematography and Hans Zimmer's pulsing score create an unforgettable atmosphere. Only a slightly hurried third act keeps it from total perfection.", 9.0, "2024-03-22")
    ],
    "avengers-endgame-2019": [
        ("The Definitive Culmination of a Decade", "A monumental narrative balancing act that pays off ten years of cinematic universe setup with genuine heart, tearful sacrifices, and an electrifying third-act battle.", 8.5, "2024-02-18"),
        ("Emotionally Satisfying Despite Time Heist Tropes", "While the time-travel logistics occasionally stumble over their own rules, the character farewells for Tony Stark and Steve Rogers provide unmatched emotional catharsis.", 8.0, "2024-04-09")
    ],
    "mad-max-fury-road-2015": [
        ("Pure Kinetic Cinematic Poetry", "George Miller redefined practical action filmmaking here. The relentless vehicular choreography, vivid color palette, and Charlize Theron's commanding presence make it a modern masterpiece.", 9.0, "2024-02-05"),
        ("A Masterclass in Visual Storytelling", "Minimal exposition and maximum immersion. Every gear shift, flamethrower riff, and dust storm sequence feels purposeful and breathlessly composed.", 8.5, "2024-05-12")
    ],
    "jurassic-park-1993": [
        ("Timeless Sense of Wonder and Terror", "Spielberg captured lightning in a bottle. The revolutionary blend of Stan Winston animatronics and groundbreaking CGI still looks more tactile than most contemporary blockbusters.", 9.0, "2024-01-28"),
        ("John Williams' Score Elevates Every Frame", "The majestic reveal of the Brachiosaurus and the terrifying T-Rex rain breakout remain foundational cinematic memories. Pure blockbuster gold.", 8.5, "2024-04-17")
    ],
    "pirates-of-the-caribbean-2003": [
        ("Johnny Depp Creates an Iconic Screen Legend", "Captain Jack Sparrow is easily one of the most delightfully unpredictable characters in cinema. Verbinski's swashbuckling tone balances genuine eerie dread with comedy.", 8.5, "2024-03-01"),
        ("High-Seas Adventure at Its Peak", "Klaus Badelt and Hans Zimmer deliver one of the most infectious musical themes ever recorded. The practical swordplay and skeleton effects still hold up wonderfully.", 8.0, "2024-05-03")
    ],
    "mission-impossible-fallout-2018": [
        ("The High-Water Mark for Modern Spy Action", "Tom Cruise and Christopher McQuarrie deliver an adrenaline shot straight to the heart. The bathroom brawl and helicopter chase in Kashmir are technical miracles.", 8.5, "2024-02-14"),
        ("Relentless Tension and Stunt Craft", "A rare franchise entry where every action set-piece somehow outdoes the last. Henry Cavill's ruthless August Walker is the perfect foil for Ethan Hunt.", 8.0, "2024-04-20")
    ],
    "top-gun-maverick-2022": [
        ("Blockbuster Filmmaking Done Right", "In an era crowded with green screens, Maverick's cockpit cinematography and visceral flight physics provide a thrilling tactile high that demands respect.", 9.0, "2024-01-19"),
        ("Surpasses the Original in Every Way", "An emotionally mature narrative that respects nostalgia while giving Maverick a poignant story about grief, mentorship, and letting go.", 8.5, "2024-03-30")
    ],
    "gladiator-2000": [
        ("Epic Historical Grandeur with Soul", "Russell Crowe's quiet nobility and Joaquin Phoenix's petulant villainy create an electrifying dynamic. The Coliseum battles are staged with operatic intensity.", 9.0, "2024-02-27"),
        ("Echoes in Eternity", "The final wheat field imagery paired with Lisa Gerrard's vocals leaves a lasting lump in the throat. A triumph of late 90s classical epic filmmaking.", 8.5, "2024-05-08")
    ],
    "spider-man-no-way-home-2021": [
        ("A Celebratory Multiverse Extravaganza", "Managing three generations of Spider-Man lore without losing Peter Parker's core sacrifice is an achievement. Tom Holland delivers his most mature performance yet.", 8.5, "2024-01-08"),
        ("Fan Service Elevated by Genuine Emotion", "The emotional weight of Willem Dafoe's return and Andrew Garfield's redemption arc make this far more than just a nostalgic stunt.", 8.0, "2024-04-12")
    ],
    "the-batman-2022": [
        ("A Moody, Methodical Detective Noir", "Matt Reeves gives Gotham City a rain-soaked, tactile decay reminiscent of 70s neo-noirs. Robert Pattinson portrays the psychological toll of vigilantism with brooding intensity.", 8.5, "2024-03-15"),
        ("Greig Fraser's Cinematography Steals the Show", "The Batmobile ignition sequence and the red flare smoke scene are instantly legendary images. Slightly drawn-out finale, but a gripping vision.", 8.0, "2024-05-19")
    ],
    "inception-2010": [
        ("Mind-Bending Narrative Architecture", "Nolan crafts a multi-layered heist where the subconscious rules feel simultaneously intricate and intuitive. The rotating hallway corridor sequence remains mind-blowing.", 9.5, "2024-01-22"),
        ("A Haunting Core Beneath the Puzzle", "Beyond the dream logic, Cobb's guilt over Mal provides the true emotional gravity of the story. Zimmer's 'Time' cue is timeless.", 9.0, "2024-03-11")
    ],
    "interstellar-2014": [
        ("Cosmic Ambition Matched with Human Heart", "The docking sequence alone warrants admission. Kip Thorne's scientific foundations combined with Matthew McConaughey's tearful video-playback scene create pure magic.", 9.5, "2024-02-10"),
        ("An Overwhelming Audiovisual Experience", "Zimmer's church organ score shakes you to the bone. Love as a fifth-dimensional force might sound corny on paper, but it lands with total sincerity.", 9.0, "2024-04-25")
    ],
    "the-matrix-1999": [
        ("A Philosophical Paradigm Shift", "The Wachowskis redefined science fiction, action choreography, and cyber-punk style overnight. The bullet-time visual effects became instant cinema history.", 9.0, "2024-01-05"),
        ("Plato's Allegory Wrapped in Leather and Kung Fu", "From the green color grade to Keanu Reeves' stoic transformation, every minute feels visionary, sharp, and conceptually flawless.", 9.0, "2024-03-08")
    ],
    "dune-part-two-2024": [
        ("Monumental Sci-Fi on an Unprecedented Scale", "Denis Villeneuve has created the 'Empire Strikes Back' of this generation. The worm-riding sequences, Giedi Prime black-and-white arena, and political dread are mesmerizing.", 9.5, "2024-03-05"),
        ("Chalamet and Zendaya Anchor an Audacious Epic", "The tragic transformation of Paul Atreides from hesitant exiled prince to terrifying messiah is executed with uncompromising cinematic vision.", 9.0, "2024-05-01")
    ],
    "arrival-2016": [
        ("Intellectually Profound and Deeply Moving", "A science fiction film that prioritizes communication over destruction. Amy Adams delivers a career-defining performance as she navigates non-linear alien linguistics.", 8.5, "2024-02-19"),
        ("The Emotional Reveal is Devastatingly Beautiful", "Johann Johannsson's haunting score paired with Max Richter's 'On the Nature of Daylight' frames a philosophical question on grief that lingers long after.", 8.5, "2024-04-03")
    ],
    "blade-runner-2049-2017": [
        ("A Miraculous Sequel That Honors the Original", "Roger Deakins' cinematography is nothing short of transcendent. The orange dust of Las Vegas and neon gloom of Los Angeles are pure aesthetic bliss.", 8.5, "2024-01-31"),
        ("Poignant Meditations on Soul and Memory", "Ryan Gosling plays Officer K with understated melancholia. A patient, slow-burn masterpiece that rewards careful attention.", 8.5, "2024-04-14")
    ],
    "harry-potter-and-the-philosophers-stone-2001": [
        ("The Spark of a Cultural Phenomenon", "Chris Columbus infused Hogwarts with sheer Christmas warmth and youthful wonder. John Williams' 'Hedwig's Theme' instantly transports you into pure childhood magic.", 8.0, "2024-02-24"),
        ("Remarkable Casting That Defined a Generation", "Seeing the Great Hall and Diagon Alley realized for the first time remains nostalgic perfection. An endearing, faithful literary adaptation.", 8.0, "2024-05-10")
    ],
    "the-lord-of-the-rings-the-fellowship-of-the-ring-2001": [
        ("The Pinnacle of High Fantasy Cinema", "Peter Jackson captured Tolkien's prose with reverent majesty. From the tranquility of the Shire to the terror of the Mines of Moria, every frame is immaculate.", 9.5, "2024-01-16"),
        ("Howard Shore's Score is Unsurpassed", "The Fellowship theme soaring over the New Zealand mountain passes is pure cinematic poetry. The definitive benchmark for world-building.", 9.5, "2024-03-27")
    ],
    "everything-everywhere-all-at-once-2022": [
        ("Audacious, Absurdist, and Deeply Empathetic", "Only the Daniels could make a pair of googly-eyed rocks talking with subtitles bring audiences to tears. Michelle Yeoh and Ke Huy Quan give unforgettable performances.", 8.5, "2024-02-08"),
        ("A Triumphant Chaos of Multiverse Imagination", "Tackling existential depression and immigrant family trauma through hot-dog fingers and tax forms. An utterly singular, vibrant experience.", 8.0, "2024-04-22")
    ],
    "avatar-2009": [
        ("A Technological Watershed Moment", "James Cameron built an entire bioluminescent ecosystem that felt tangibly alive. The floating Hallelujah Mountains and forest night sequences set a new visual standard.", 8.0, "2024-01-11"),
        ("Familiar Story Powered by World-Class Spectacle", "While the plot beats echo Dances with Wolves, the immersive kinetic action and Neytiri's vocal performance deliver undeniable cinematic pleasure.", 8.0, "2024-03-19")
    ],
    "se7en-1995": [
        ("Dark, Oppressive, and Masterfully Constructed", "Fincher's neo-noir masterpiece captures an unrelenting urban dread where rain never stops. Brad Pitt and Morgan Freeman share flawless generational chemistry.", 9.0, "2024-02-12"),
        ("A Climax That Shook Cinema to Its Core", "Kevin Spacey's John Doe is bone-chilling precisely because of his cold, clinical detachment. The desert standoff remains one of the greatest endings in film history.", 9.0, "2024-05-15")
    ],
    "shutter-island-2010": [
        ("Scorsese's Atmospheric Psychological Maze", "Leonardo DiCaprio portrays Teddy Daniels with a harrowing, frayed desperation. The Gothic asylum setting and Robert Richardson's harsh lighting amplify the disorientation.", 8.5, "2024-01-25"),
        ("A Devastating Closing Question", "Whether it is better to live as a monster or die as a good man. The psychological foreshadowing makes second viewings immensely rewarding.", 8.5, "2024-04-18")
    ],
    "gone-girl-2014": [
        ("A Razor-Sharp Satire of Marriage and Media", "Rosamund Pike delivers a chilling, mesmerizing performance as 'Amazing Amy'. Trent Reznor and Atticus Ross provide an icy ambient score that unnerves throughout.", 8.5, "2024-03-04"),
        ("Calculated and Wickedly Entertaining", "The mid-point narrative twist completely upends viewer sympathies. David Fincher's clinical precision finds the ideal vehicle in Gillian Flynn's screenplay.", 8.5, "2024-05-22")
    ],
    "knives-out-2019": [
        ("A Delightfully Fresh Agatha Christie Homage", "Rian Johnson injects energy and biting class satire into the classic whodunit. Daniel Craig's eccentric Southern drawl as Benoit Blanc is an instant crowd-pleaser.", 8.0, "2024-02-16"),
        ("Cleverly Subverts the Murder Mystery Playbook", "Ana de Armas provides the earnest moral compass in an estate full of squabbling vultures. Fun, witty, and gorgeously styled.", 8.0, "2024-04-28")
    ],
    "the-silence-of-the-lambs-1991": [
        ("A Masterclass in Psychological Standoffs", "Anthony Hopkins commands the screen for barely twenty minutes yet creates cinema's most terrifying intellectual monster. Jodie Foster's resilience is legendary.", 9.0, "2024-01-09"),
        ("Demme's Close-Ups Create Unbearable Intimacy", "The claustrophobic camerawork and Howard Shore's brooding music build tension out of mere conversations. A timeless five-Oscar masterpiece.", 9.0, "2024-03-14")
    ],
    "get-out-2017": [
        ("Groundbreaking Social Horror for Modern Times", "Jordan Peele turned subtle microaggressions into horrifying physical traps. The 'Sunken Place' metaphor is one of the most brilliant visual conceits of the decade.", 8.5, "2024-02-21"),
        ("Daniel Kaluuya Anchors Every Terrified Breath", "Seamlessly weaves dark comedic relief through Lil Rel Howery while maintaining an escalating sense of sinister dread. Truly original.", 8.0, "2024-05-06")
    ],
    "the-conjuring-2013": [
        ("Old-School Haunted House Craft at Its Finest", "James Wan uses camera pans, creaking floorboards, and clapping games instead of cheap digital scares. Patrick Wilson and Vera Farmiga lend genuine heart.", 8.0, "2024-01-29"),
        ("Terrifyingly Effective Atmosphere", "The cellar sequences and hide-and-clap scenes deliver visceral terror. One of the rare modern horror films that earns its classic reputation.", 7.5, "2024-04-11")
    ],
    "a-quiet-place-2018": [
        ("A Sensory Nightmare Executed with Elegance", "John Krasinski turns sound design into a weapon. Emily Blunt's nail-on-the-stairs sequence is guaranteed to have every audience member holding their breath.", 8.0, "2024-03-18"),
        ("Strong Familial Core Grounded in Real Grief", "The tension is unrelenting, but it works primarily because you genuinely care about the survival of the Abbott family.", 7.5, "2024-05-25")
    ],
    "parasite-2019": [
        ("A Flawless Social Thriller with Piercing Wit", "Bong Joon-ho crafts a genre-bending symphony that swings from laugh-out-loud scam comedy to blood-curdling class tragedy with effortless grace.", 9.5, "2024-01-18"),
        ("Every Camera Movement Tells a Tale of Hierarchy", "The rainstorm sequence showing the descent from the elevated hilltop mansion to the flooded basement apartment is architectural storytelling at its zenith.", 9.0, "2024-03-24")
    ],
    "train-to-busan-2016": [
        ("Heart-Pounding Action with Real Emotional Stakes", "Takes the tired zombie genre and injects ferocious kinetic energy by locking the outbreak inside high-speed train cars. Ma Dong-seok is an absolute force.", 8.0, "2024-02-28"),
        ("Unashamedly Tear-Jerking Climax", "Beyond the terrifying infected contortions, the transformation of Gong Yoo's selfish corporate father into a protector will break your heart.", 8.0, "2024-05-14")
    ],
    "the-shawshank-redemption-1994": [
        ("The Ultimate Ode to the Resilience of the Human Spirit", "Tim Robbins and Morgan Freeman create one of cinema's most comforting and inspiring bonds. Roger Deakins' warm lighting gives Shawshank an almost spiritual glow.", 9.5, "2024-01-04"),
        ("Flawlessly Structured and Profoundly Cathartic", "Andy Dufresne crawling through five hundred yards of foulness to come out clean on the other side is the definition of iconic cinema.", 9.5, "2024-03-12")
    ],
    "forrest-gump-1994": [
        ("A Heartwarming Tapestry of Twentieth-Century America", "Tom Hanks delivers an all-time classic performance filled with sweetness, innocence, and surprising emotional depth. Alan Silvestri's feather theme is unforgettable.", 9.0, "2024-02-15"),
        ("Tears, Laughter, and Historic Nostalgia", "The interactions between Forrest and Lieutenant Dan provide the film's deepest emotional anchor. An endlessly rewatchable crowd-pleaser.", 9.0, "2024-04-26")
    ],
    "the-pursuit-of-happyness-2006": [
        ("A Gut-Wrenching and Inspiring True Story", "Will Smith's portrayal of fatherly devotion during abject poverty is raw and devastating. The subway bathroom door scene is impossible to watch without tears.", 8.5, "2024-03-09"),
        ("Real-Life Chemistry Between Father and Son", "Jaden Smith and Will Smith share authentic warmth that elevates this above typical melodrama into a poignant study of perseverance.", 8.0, "2024-05-17")
    ],
    "whiplash-2014": [
        ("An Electrifying Psychological Duel", "J.K. Simmons as Terence Fletcher is as terrifying as any horror villain, while Miles Teller matches his fury blow for blow. The editing has the speed of a machine gun.", 9.0, "2024-01-23"),
        ("The 'Caravan' Finale is Ten Minutes of Pure Ecstasy", "Explores the toxic price of artistic greatness without offering easy answers. Damien Chazelle announces himself as an extraordinary directorial voice.", 9.0, "2024-04-05")
    ],
    "the-green-mile-1999": [
        ("An Emotionally Shattering Supernatural Drama", "Michael Clarke Duncan brings a heartbreaking tenderness to John Coffey. Tom Hanks leads a pitch-perfect ensemble navigating justice, miracles, and cruelty.", 9.0, "2024-02-03"),
        ("Three Hours That Pass in a Heartbeat", "Frank Darabont once again proves why he is Stephen King's premier interpreter. Prepare a box of tissues for Coffey's final walk.", 8.5, "2024-04-29")
    ],
    "titanic-1997": [
        ("Spectacle and Romance on an Unrivaled Scale", "James Cameron's historic reconstruction of the grand ship and its demise is staggering in detail. Leonardo DiCaprio and Kate Winslet have generational chemistry.", 8.5, "2024-01-30"),
        ("The Ship Breakup Sequence is Terrifying Technical Art", "James Horner's lush Celtic score and the sheer scale of practical tilting sets create an immersive disaster tragedy that has never been equaled.", 8.0, "2024-03-21")
    ],
    "la-la-land-2016": [
        ("A Dazzling Love Letter to Dreamers and Old Hollywood", "Ryan Gosling and Emma Stone shine in the opening freeway sequence and planetarium waltz. Justin Hurwitz's melodies lodge straight in your subconscious.", 8.5, "2024-02-26"),
        ("That Bittersweet Alternate Reality Epilogue", "The final fantasy montage showing what could have been is one of the most poignant cinematic reflections on love versus career ambitions.", 8.5, "2024-05-09")
    ],
    "the-grand-budapest-hotel-2014": [
        ("Wes Anderson's Most Accomplished and Whimsical Jewel", "Ralph Fiennes gives a tour-de-force comic turn as the impeccably scented M. Gustave. The symmetrical pastel frames and aspect-ratio shifts are pure delight.", 8.5, "2024-01-15"),
        ("Beneath the Pastry Colors Lies Deep Nostalgia", "Stefan Zweig's influence gives the whimsical caper a melancholic undercurrent about a civilized European world vanishing before the march of barbarism.", 8.5, "2024-04-01")
    ],
    "coco-2017": [
        ("A Radiant Celebration of Family, Memory, and Mexican Heritage", "Pixar's Land of the Dead is an architectural and color explosion of alebrijes and marigold bridges. 'Remember Me' will break the hardest of hearts.", 9.0, "2024-02-17"),
        ("The Power of Song Across Generations", "The gentle, tear-filled duet with Mama Coco at the conclusion is one of the most emotionally profound climaxes in animated film history.", 8.5, "2024-05-18")
    ],
    "inside-out-2015": [
        ("Pixar's Psychological Masterwork", "Translating abstract mental concepts like abstract thought, long-term memory, and core emotions into accessible comedy is an astonishing creative feat.", 8.5, "2024-03-16"),
        ("Validates That Sadness is Essential to Healing", "A mature message for audiences of all ages: happiness cannot exist without allowing oneself to mourn and be consoled. Truly moving.", 8.5, "2024-05-27")
    ],
    "3-idiots-2009": [
        ("The Gold Standard of Indian Comedy-Drama", "Aamir Khan, R. Madhavan, and Sharman Joshi capture the joys and pressures of engineering college with effortless charm. 'All is well' became a mantra for millions.", 9.0, "2024-01-20"),
        ("A Scathing Critique Wrapped in Pure Entertainment", "Balancing riotous laughter with poignant commentary on systemic educational pressure. Boman Irani's 'Virus' is unforgettable.", 8.5, "2024-04-10")
    ],
    "dangal-2016": [
        ("Electrifying Sports Drama with Tremendous Emotional Force", "Aamir Khan's physical transformation as older Mahavir Phogat is startling, but Fatima Sana Shaikh and Sanya Malhotra carry the fighting soul of the film.", 9.0, "2024-02-09"),
        ("World-Class Wrestling Choreography", "The matches in the final tournament feel genuinely tense and technically authentic. Pritam's rousing soundtrack fuels every takedown.", 8.5, "2024-04-23")
    ],
    "lagaan-2001": [
        ("An Audacious Epic of Colonial Defiance", "Over three hours long, yet the climactic cricket match has you on the edge of your seat on every ball. A.R. Rahman's score is an undisputed masterpiece.", 8.5, "2024-03-02"),
        ("Captures the Soul of Rural Resilience", "Aamir Khan produced a cinematic miracle that carried Indian storytelling all the way to the Academy Awards. Pure historical triumph.", 8.5, "2024-05-16")
    ],
    "zindagi-na-milegi-dobara-2011": [
        ("The Ultimate Soul-Searching Road Trip", "Hrithik Roshan, Farhan Akhtar, and Abhay Deol share magnetic camaraderie across the stunning vistas of Spain. Deep-sea diving and La Tomatina leave lasting impressions.", 8.5, "2024-01-26"),
        ("Javed Akhtar's Poetry Gives It Philosophical Wings", "More than just scenic escapism; it is a thoughtful manifesto on slowing down, confronting trauma, and learning how to truly live in the present.", 8.5, "2024-04-15")
    ],
    "andhadhun-2018": [
        ("A Rollercoaster of Morbid Wit and Deception", "Sriram Raghavan delivers India's finest pulp-noir thriller. Ayushmann Khurrana and Tabu give career-defining turns in a cat-and-mouse game where nobody is innocent.", 8.5, "2024-02-13"),
        ("Twists That Keep You Guessing Until the Final Frame", "The piano score intertwines with murder in devilishly playful ways. That enigmatic cane-shot ending sparked endless dinner-table debates.", 8.5, "2024-05-02")
    ],
    "queen-2013": [
        ("A Delightfully Empowering Solo Journey", "Kangana Ranaut is utterly disarming as Rani. Watching her bashful inhibition transform into exuberant Parisian independence is heartwarming.", 8.5, "2024-03-10"),
        ("Laxmi's Pani Puri Stall and Eiffel Tower Tears", "Vikas Bahl avoids conventional romance tropes by letting Rani fall in love with her own self-determination instead. Amit Trivedi's music is electric.", 8.5, "2024-05-20")
    ],
    "gully-boy-2019": [
        ("Raw Street Energy with Soul and Rhythm", "Ranveer Singh delivers a remarkably restrained, authentic performance as Murad. Siddhant Chaturvedi's MC Sher is the mentor everyone dreams of having.", 8.0, "2024-01-17"),
        ("Alia Bhatt's Safeena Stole Every Scene", "Jay Oza's intimate handheld camerawork through Dharavi captures street hip-hop culture with genuine respect and thumping authenticity.", 8.0, "2024-04-08")
    ],
    "taare-zameen-par-2007": [
        ("A Tender, Tear-Jerking Masterpiece on Empathy", "Darsheel Safary's expressive eyes convey Ishaan's confusion and hurt with shattering authenticity. Shankar-Ehsaan-Loy's 'Maa' remains devastatingly beautiful.", 9.0, "2024-02-23"),
        ("Redefined How Society Views Learning Differences", "Aamir Khan's gentle, patient art teacher demonstrated that every child blooms on their own schedule. Essential viewing for every parent and educator.", 8.5, "2024-05-11")
    ],
    "bajrangi-bhaijaan-2015": [
        ("Salman Khan's Most Sincere and Endearing Performance", "Harshaali Malhotra steals hearts without uttering a single line of dialogue as little Munni. Kabir Khan constructs a moving message of cross-border brotherhood.", 8.5, "2024-03-23"),
        ("Nawazuddin Siddiqui's Reporter Adds Comic Brilliance", "The Chand Nawab imitation is comedy gold, but the film's climax at the border gate is an undeniable emotional wallop.", 8.0, "2024-05-29")
    ],
    "drishyam-2015-hindi": [
        ("A Gripping Battle of Wits and Alibis", "Ajay Devgn brings a steely, quiet resolve to Vijay, while Tabu matches him with intimidating maternal authority as IG Meera Deshmukh.", 8.5, "2024-01-21"),
        ("October 2nd and 3rd Will Forever Live in Infamy", "The meticulous repetition of restaurant bills, bus tickets, and Swami Chinmayananda sermons makes this alibi thriller completely captivating.", 8.5, "2024-04-19")
    ],
    "rrr-2022": [
        ("Unadulterated Grandeur and Kinetic Mythmaking", "S.S. Rajamouli creates action sequences that defy physics yet feel completely earned through mythological conviction. Ram Charan and Jr NTR have incandescent chemistry.", 9.0, "2024-02-04"),
        ("The 'Naatu Naatu' Dance Off is Pure Euphoria", "From the leopard leap to the piggyback rifle assault, this is maximalist cinema firing on every conceivable cylinder. An international phenomenon.", 8.5, "2024-04-27")
    ],
    "baahubali-2-the-conclusion-2017": [
        ("Answers the Immortal Question with Sheer Spectacle", "The revelation of why Kattappa killed Baahubali delivers on every shred of hype. Prabhas exudes demigod presence as Amarendra Baahubali.", 8.5, "2024-03-07"),
        ("Operatic Royal Betrayal in Mahishmati", "Anushka Shetty's Devasena brings fierce dignity to the court scenes. Keeravani's thunderous orchestral score seals its status as a landmark epic.", 8.5, "2024-05-13")
    ],
    "pushpa-the-rise-2021": [
        ("Allu Arjun Delivers a Swag-Fueled Tour de Force", "Pushpa Raj's shoulder shrug, gait, and 'Thaggedhe Le' dialogue became an instant pop culture sensation. Devi Sri Prasad's soundtrack is infectious.", 8.0, "2024-01-27"),
        ("Fahadh Faasil Sets Up an Epic Rivalry", "The gritty depiction of the red sanders smuggling trade feels raw and earthy. The final naked showdown sets the stage for explosive consequences.", 7.5, "2024-04-06")
    ],
    "kgf-chapter-2-2022": [
        ("Industrial Action and Mass Heroism Cranked to Eleven", "Yash commands the frame with swagger and magnetic gravity as Rocky Bhai. Ujwal Kulkarni's rapid-fire editing style gives the battles a relentless tempo.", 8.5, "2024-03-20"),
        ("Sanjay Dutt's Adheera Brings Menacing Viking Grit", "Ravi Basrur's booming BGM reverberates through your chest. A sensory explosion that delivers exactly what mass action cinema promises.", 8.0, "2024-05-24")
    ],
    "kantara-2022": [
        ("A Mesmerizing Fusion of Folklore, Justice, and Nature", "Rishab Shetty directed and starred in a cultural revelation. The Bhoota Kola ritual scenes in coastal Karnataka channel an otherworldly, divine energy.", 9.0, "2024-02-11"),
        ("The Final Twenty Minutes Are Completely Transcendent", "The vocal scream of the Guliga Daiva during the climax raises chills on your arms. A rare film where traditional roots ignite fiery contemporary action.", 8.5, "2024-05-04")
    ],
    "eega-2012": [
        ("Rajamouli Turns a Housefly into an Action Titan", "Only S.S. Rajamouli could make an audience cheer with bated breath for a tiny insect doing push-ups to avenge his own murder. Pure imaginative bravura.", 8.0, "2024-01-31"),
        ("Sudeep's Frustrated Villainy is Spectacular", "The visual effects team did an exceptional job imbuing the CGI fly with personality, while Sudeep plays the descent into mosquito-fueled insanity with glee.", 8.0, "2024-04-16")
    ],
    "sita-ramam-2022": [
        ("A Poetic, Old-School Romance Bathed in Elegance", "Dulquer Salmaan and Mrunal Thakur display an ethereal, timeless chemistry. P.S. Vinod's cinematography across Kashmir and Gujarat looks like living paintings.", 9.0, "2024-03-13"),
        ("Vishal Chandrashekhar's Melodies Melt the Soul", "Rashmika Mandanna's investigative journey uncovers a tragic, noble love story that avoids cynicism and embraces classic romantic dignity.", 8.5, "2024-05-19")
    ],
    "mahanati-2018": [
        ("Keerthy Suresh Reincarnates Savitri with Grace", "Keerthy's Oscar-worthy transformation captures every nuance of the legendary actress's laughter, stardom, and tragic decline. Deservedly won the National Award.", 8.5, "2024-02-18"),
        ("Lavish Period Recreation of South India's Golden Era", "Dulquer Salmaan's Gemini Ganesan is charming yet flawed. Nag Ashwin directs a biographical tribute that feels deeply reverent and profoundly sad.", 8.5, "2024-05-07")
    ],
    "vikram-2022": [
        ("Kamal Haasan's Grand Return Ignites the LCU", "A gritty, guns-blazing neo-noir where Fahadh Faasil and Vijay Sethupathi bring unhinged intensity to the narcotics underworld. Anirudh's score is deafeningly epic.", 8.5, "2024-01-12"),
        ("The Rolex Cameo Blew the Roof Off Theaters", "Lokesh Kanagaraj orchestrates multi-agent combat with surgical precision. Kamal Haasan proves that true screen legends never age.", 8.5, "2024-04-02")
    ],
    "96-2018": [
        ("A Bittersweet Masterpiece of Nostalgia and Unspoken Words", "Vijay Sethupathi and Trisha Krishnan carry this entire film with conversations, glances, and long silences. Govind Vasantha's violin score is melancholic heaven.", 9.0, "2024-03-25"),
        ("Pure Romance Without a Single Touch", "Captures the ache of high school sweethearts meeting after two decades with gentle, respectful honesty. An unforgettable emotional journey.", 8.5, "2024-05-30")
    ],
    "drishyam-2013-malayalam": [
        ("The Flawless Original Mystery That Spawned Global Remakes", "Mohanlal's understated brilliance as Georgekutty sets the benchmark. Jeethu Joseph's script is an airtight puzzle where every throwaway line matters.", 9.0, "2024-02-02"),
        ("A Gripping Demonstration of Family Protection", "Watching a cinema-obsessed ordinary man construct a fortress of psychological alibis out of everyday encounters is sheer screenwriting perfection.", 8.5, "2024-04-21")
    ],
    "manjummel-boys-2024": [
        ("Breathless Real-Life Survival Drama", "Chidambaram captures the genuine bond of Malayali youth without artificial heroics. The descent into the subterranean darkness of Guna Caves is horrifyingly realistic.", 8.5, "2024-03-17"),
        ("The 'Kanmani Anbodu' Climax is Pure Goosebumps", "Repurposing Ilaiyaraaja's classic Kamal Haasan song in the final rescue scene created one of the most euphoric theater moments in recent Indian cinema.", 8.5, "2024-05-21")
    ],
    "premam-2015": [
        ("A Breezy, Nostalgic Celebration of Youth and Romance", "Nivin Pauly's black shirt, mundu, and beard look set a fashion trend across Kerala and Tamil Nadu. Sai Pallavi's Malar teacher became an instant cultural icon.", 8.5, "2024-01-24"),
        ("Alphonse Puthren's Irresistible Visual Style", "Butterfly motifs, slow-motion college walks, and Rajesh Murugesan's music make this an endlessly charming coming-of-age classic.", 8.5, "2024-04-13")
    ],
    "bangalore-days-2014": [
        ("Warm, Uplifting, and Full of Life", "Nazriya Nazim, Nivin Pauly, and Dulquer Salmaan create the warmest cousin bond ever put on screen. Gopi Sunder's background score is full of sparkling sunshine.", 8.5, "2024-02-20"),
        ("The Definitive Feel-Good Urban Malayalam Drama", "Anjali Menon captures the anxieties of marriage, dreams, and family expectations with gentle humor and breezy cosmopolitan flair.", 8.5, "2024-05-05")
    ],
    "kumbalangi-nights-2019": [
        ("Sublime, Poetic, and Socially Astute", "Redefines modern Indian family dynamics through four broken brothers learning to embrace tenderness. Fahadh Faasil's villainous Shammi is an unforgettable critique of toxic patriarchy.", 9.0, "2024-03-06"),
        ("Sushin Shyam's Ethereal Music Completes the Magic", "The backwaters of Kumbalangi shimmer with nocturnal luminescence. Warm, hilarious, and deeply therapeutic cinema.", 9.0, "2024-05-26")
    ],
    "ustad-hotel-2012": [
        ("A Feast for the Palate and the Soul", "Thilakan and Dulquer Salmaan share grandfather-grandson chemistry that will warm your heart. The culinary philosophy of serving love before food is timeless.", 8.5, "2024-01-10"),
        ("Sufi Aromas and Malabar Beach Breezes", "Anjali Menon's writing and Gopi Sunder's 'Appangal Embadhum' make this an uplifting celebration of Kozhikode's hospitable spirit.", 8.5, "2024-04-04")
    ],
    "charlie-2015-malayalam": [
        ("A Whimsical, Bohemian Fairy Tale", "Dulquer Salmaan and Parvathy Thiruvothu exude magnetic charisma. The eclectic art direction, antique clocks, and graffiti-laden Kochi walls look enchanting.", 8.0, "2024-02-25"),
        ("Celebrates Living Life Like the Wandering Wind", "Jomon T. John's rich cinematography captures Thrissur Pooram and Kerala landscapes with vibrant warmth and magical realism.", 8.0, "2024-05-12")
    ],
    "kirik-party-2016": [
        ("The Quintessential Campus Nostalgia Trip", "Rakshit Shetty and Rashmika Mandanna capture engineering college camaraderie, first crushes, and canteen pranks with joyous irreverence.", 8.0, "2024-03-29"),
        ("A Heartfelt Evolution from Mischief to Maturity", "Ajaneesh Loknath's infectious soundtrack and Rishab Shetty's direction make this one of the most beloved Kannada youth entertainers.", 8.0, "2024-05-28")
    ],
    "lucia-2013-kannada": [
        ("A Groundbreaking Crowdfunded Psychological Puzzle", "Pawan Kumar delivered a non-linear triumph on a shoestring budget. Sathish Ninasam is fantastic navigating the monochromatic reality and color dreamscape.", 8.5, "2024-01-19"),
        ("Intertwines Consumer Ambition with Lucid Dreams", "Poornachandra Tejaswi's music and the inventive lighting tricks prove that visionary writing outshines bloated studio budgets any day.", 8.5, "2024-04-24")
    ],
    "dia-2020-kannada": [
        ("An Emotionally Crushing Romantic Tragedy", "Kushee Ravi portrays Dia's quiet grief with heartbreaking sincerity. Dheekshith Shetty brings infectious joy as the cheerful Adi who brings her back to life.", 8.5, "2024-02-16"),
        ("That Climax Will Haunt You for Days", "K.S. Ashoka refuses to take the conventional melodramatic route, delivering an ending that leaves audiences staring at the credits in stunned silence.", 8.5, "2024-05-15")
    ]
}

sample_reviews = []
review_counter = 1

for idx, movie in enumerate(movies):
    mid = movie["id"]
    movie_reviews = tailored_reviews.get(mid)
    
    if not movie_reviews or len(movie_reviews) < 2:
        # Fallback two reviews
        movie_reviews = [
            (f"Engaging and Memorable Viewing Experience", f"{movie['title']} stands out as a compelling work in the {movie['primaryGenre']} genre, anchored by strong performances and steady direction.", round(movie['rating'], 1), "2024-02-15"),
            (f"Solid Craftsmanship Throughout", f"A worthwhile cinematic journey with impressive visuals and thoughtful pacing. {movie['title']} rewards multiple viewings.", round(max(movie['rating'] - 0.5, 6.0), 1), "2024-04-20")
        ]
        
    for r_idx, (title, text, rating, date) in enumerate(movie_reviews):
        reviewer = reviewers_bank[(idx * 2 + r_idx) % len(reviewers_bank)]
        sample_reviews.append({
            "id": f"rev-p-{review_counter:03d}",
            "movieId": mid,
            "userName": reviewer["name"],
            "userAvatar": reviewer["avatar"],
            "initials": reviewer["initials"],
            "rating": rating,
            "reviewTitle": title,
            "reviewText": text,
            "date": date,
            "isPredefined": True
        })
        review_counter += 1

reviews_output_path = os.path.join("src", "data", "sampleReviews.json")
with open(reviews_output_path, "w", encoding="utf-8") as f:
    json.dump(sample_reviews, f, indent=2)

print(f"sampleReviews.json written successfully: {len(sample_reviews)} reviews across {len(movies)} movies.")
