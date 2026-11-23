# scripts/generate_expanded_reviews.py
import json
import os

with open(os.path.join("src", "data", "movies.json"), "r", encoding="utf-8") as f:
    movies = json.load(f)

# Bank of diverse fictional reviewers
reviewers_pool = [
    # Dedicated default profile: Arjun Sharma with golden film-reel emblem
    {"name": "Arjun Sharma", "avatar": "/images/branding/film-reel-avatar.svg", "initials": "AS", "isDefault": True},
    # Diverse community reviewers
    {"name": "Daniel Carter", "avatar": "", "initials": "DC"},
    {"name": "Sophia Bennett", "avatar": "", "initials": "SB"},
    {"name": "Ethan Brooks", "avatar": "", "initials": "EB"},
    {"name": "Olivia Parker", "avatar": "", "initials": "OP"},
    {"name": "Ryan Mitchell", "avatar": "", "initials": "RM"},
    {"name": "Emma Wilson", "avatar": "", "initials": "EW"},
    {"name": "Noah Anderson", "avatar": "", "initials": "NA"},
    {"name": "Maya Patel", "avatar": "", "initials": "MP"},
    {"name": "Vikram Rao", "avatar": "", "initials": "VR"},
    {"name": "Ananya Iyer", "avatar": "", "initials": "AI"},
    {"name": "Sarah Jenkins", "avatar": "", "initials": "SJ"},
    {"name": "Lucas Wright", "avatar": "", "initials": "LW"},
    {"name": "Kavita Nair", "avatar": "", "initials": "KN"},
    {"name": "Julian Thorne", "avatar": "", "initials": "JT"},
    {"name": "Elena Rostova", "avatar": "", "initials": "ER"},
    {"name": "Marcus Vance", "avatar": "", "initials": "MV"},
    {"name": "Chloe Dupont", "avatar": "", "initials": "CD"},
    {"name": "Arjun Sen", "avatar": "", "initials": "AS"},
    {"name": "Hannah Abbott", "avatar": "", "initials": "HA"},
    {"name": "Devendra Sharma", "avatar": "", "initials": "DS"},
    {"name": "Priya Nambiar", "avatar": "", "initials": "PN"},
    {"name": "Felix Vance", "avatar": "", "initials": "FV"},
    {"name": "Siddharth Menon", "avatar": "", "initials": "SM"},
    {"name": "Tara Al-Mansoor", "avatar": "", "initials": "TA"},
    {"name": "Gabriel Santos", "avatar": "", "initials": "GS"},
    {"name": "Meera Joshi", "avatar": "", "initials": "MJ"},
    {"name": "Liam Chen", "avatar": "", "initials": "LC"},
    {"name": "Rohan Deshmukh", "avatar": "", "initials": "RD"},
    {"name": "Zara Scott", "avatar": "", "initials": "ZS"},
    {"name": "Karthik Raja", "avatar": "", "initials": "KR"},
    {"name": "Nandita Dasgupta", "avatar": "", "initials": "ND"},
    {"name": "Oliver Quinn", "avatar": "", "initials": "OQ"},
    {"name": "Deepak Hegde", "avatar": "", "initials": "DH"},
    {"name": "Aisling O'Connor", "avatar": "", "initials": "AO"}
]

# Movies reviewed by default user Arjun Sharma
arjun_sharma_movies = {
    "the-dark-knight-2008": ("A Masterclass in Psychological Tension and Moral Ambiguity", "Ledger's Joker redefined what a cinematic antagonist could be. Beyond the explosive set pieces, the script's willingness to probe ethical dilemmas without neat answers makes this film endure as a genre pinnacle.", 9.5, "2024-11-12"),
    "inception-2010": ("Intricate Narrative Architecture That Demands Full Attention", "Cobb's journey through multi-tiered dream levels remains one of the most inventive heist narratives ever conceived. Hans Zimmer's surging brass score anchors the philosophical gravity of dream extraction.", 9.5, "2024-11-20"),
    "interstellar-2014": ("Cosmic Scale Balanced with Raw Emotional Humanity", "The five-dimensional tesseract climax paired with the heartbreaking time dilation sequences on Miller's planet created an unforgettable theatrical memory. Zimmer's church organ score is transcendent.", 9.0, "2024-12-05"),
    "dune-part-two-2024": ("Monumental World-Building and Tragic Mythic Destiny", "Villeneuve delivers a sensory triumph on Arrakis. Chalamet captures Paul Atreides' terrifying descent into messianic vengeance with startling nuance. Greig Fraser's lighting is sheer perfection.", 9.5, "2025-01-14"),
    "arrival-2016": ("A Profound Meditation on Time, Grief, and Human Connection", "Amy Adams delivers an astounding, quiet performance as Dr. Louise Banks. The non-linear narrative twist reframes personal sorrow as a deliberate, courageous embrace of life.", 9.0, "2024-10-28"),
    "se7en-1995": ("Grim, Claustrophobic Atmosphere That Never Lets Up", "Fincher constructs a rainy, decayed metropolis that feels rotting from the inside out. Pitt and Freeman have unmatched generational chemistry leading into that gut-wrenching desert finale.", 9.0, "2024-11-04"),
    "parasite-2019": ("Razor-Sharp Class Commentary Wrapped in Dark Humor", "Bong Joon-ho shifts genres effortlessly from lighthearted con comedy into harrowing social tragedy. The subterranean bunker reveal completely recalibrated modern international thriller pacing.", 9.5, "2024-12-18"),
    "the-shawshank-redemption-1994": ("The Benchmark for Enduring Hope in American Cinema", "Andy Dufresne's patient resilience and Red's soulful narration create a film that feels comforting yet never sentimental. Darabont adapted King's novella into an untouchable masterpiece.", 9.5, "2024-10-15"),
    "whiplash-2014": ("Breathless Kinetic Pacing and Toxic Mentorship", "J.K. Simmons commands every scene with terrifying ferocity. The climactic 'Caravan' drum solo is twenty minutes of uninterrupted visual and acoustic adrenaline.", 9.0, "2025-01-08"),
    "3-idiots-2009": ("Essential Blend of Heart, Laughter, and Academic Critique", "Hirani managed to critique systemic educational rote learning while delivering anthemic musical numbers and heartfelt camaraderie. A milestone in mainstream Indian cinema.", 8.5, "2024-11-26"),
    "andhadhun-2018": ("Twisted Black Comedy Noir at Its Absolute Best", "Sriram Raghavan keeps viewers on edge through rapid-fire twists and deceptive piano motifs. Tabu and Ayushmann Khurrana delivered career-best performances in an unapologetically cynical world.", 8.5, "2024-12-22"),
    "rrr-2022": ("Unapologetic Maximalist Grandeur and Kinetic Mythmaking", "Rajamouli understands visual mythology better than almost any director working today. The tiger confrontation, Naatu Naatu sequence, and dual hero choreography are pure cinematic euphoria.", 9.0, "2025-01-20"),
    "manjummel-boys-2024": ("Visceral Survival Thriller Powered by Friendship", "Chidambaram's atmospheric descent into Guna Caves is horrifyingly authentic. Using Ilaiyaraaja's classic score in the rescue scene generated unmatched emotional chills.", 8.5, "2025-02-02")
}

angles = [
    ("Brilliant Visual Composition and Rhythmic Direction", "The director establishes an immersive visual cadence from the very first sequence. The camera movements and color timing elevate standard tropes into genuine cinematic art.", 8.5),
    ("Electrifying Lead Performances Carry the Narrative", "The cast demonstrates extraordinary emotional range, finding truth in subtle gestures rather than bombastic delivery. You stay invested purely for the character dynamic.", 8.0),
    ("Exceptional Sound Design and Atmospheric Score", "The musical composition works seamlessly with the soundscape to build tension during critical scenes. Every crescendo feels deliberate and emotionally earned.", 8.5),
    ("Gripping Premise Held Back Slightly by Pacing", "The initial hour is near flawless, though the second act suffers from a few narrative detours that test viewer patience. Still, the final resolution delivers solidly.", 7.0),
    ("Rich Thematic Resonances That Reward Careful Viewing", "Beneath the genre entertainment lies a poignant exploration of memory, duty, and human consequence. It sparks thoughtful conversation hours after the credits roll.", 8.0),
    ("An Absolute Delight to Experience More Than Once", "Every technical department fired on all cylinders here. The pacing is snappy, the dialogue is memorable, and the emotional payoff hits cleanly on every repeat watch.", 8.5),
    ("Ambitious Effort with Minor Flaws in the Climax", "Visually arresting and conceptually brave, though the concluding set piece feels somewhat hurried compared to the methodical buildup. Still firmly recommended.", 7.5),
    ("A Definitive Highlight of Modern Genre Storytelling", "Few films manage to sustain this degree of intensity without losing emotional grounding. A truly accomplished piece of filmmaking that deserves all the acclaim.", 9.0)
]

final_reviews = []
review_id_counter = 1

sample_dates = [
    "2024-01-12", "2024-02-04", "2024-02-28", "2024-03-15",
    "2024-04-02", "2024-04-20", "2024-05-11", "2024-05-27",
    "2024-06-18", "2024-07-09", "2024-08-14", "2024-09-03",
    "2024-09-22", "2024-10-17", "2024-11-05", "2024-11-28",
    "2024-12-14", "2025-01-05", "2025-01-22", "2025-02-10"
]

for m_idx, movie in enumerate(movies):
    mid = movie["id"]
    movie_title = movie["title"]
    movie_genre = movie["primaryGenre"]
    movie_year = movie["releaseYear"]
    movie_dir = movie.get("director", "the director")
    
    movie_reviews = []
    
    # Check if Arjun Sharma has a specific review for this movie
    if mid in arjun_sharma_movies:
        a_title, a_text, a_rating, a_date = arjun_sharma_movies[mid]
        arjun_obj = reviewers_pool[0]
        movie_reviews.append({
            "id": f"rev-{review_id_counter:04d}",
            "movieId": mid,
            "userName": arjun_obj["name"],
            "userAvatar": arjun_obj["avatar"],
            "initials": arjun_obj["initials"],
            "rating": a_rating,
            "reviewTitle": a_title,
            "reviewText": a_text,
            "date": a_date,
            "isPredefined": True,
            "isProfileUser": True
        })
        review_id_counter += 1
    
    target_count = 8
    needed = target_count - len(movie_reviews)
    
    other_reviewers = [r for r in reviewers_pool if not r.get("isDefault")]
    reviewer_offset = (m_idx * 7) % len(other_reviewers)
    
    for i in range(needed):
        rev_person = other_reviewers[(reviewer_offset + i) % len(other_reviewers)]
        angle_title, angle_body, angle_base_rating = angles[i % len(angles)]
        
        base_movie_rating = movie.get("rating", 8.0)
        rating_mod = ((i * 3 + m_idx) % 5 - 2) * 0.5
        calc_rating = round(max(5.5, min(10.0, base_movie_rating + rating_mod)), 1)
        rev_date = sample_dates[(m_idx * 3 + i * 2) % len(sample_dates)]
        
        if i == 0:
            custom_title = f"{movie_title}: A Landmark in {movie_genre} Storytelling"
            custom_text = f"Directed with clear purpose by {movie_dir}, {movie_title} ({movie_year}) stands out for its bold narrative ambition and atmospheric tension. The way the emotional stakes build toward the climax demonstrates masterful genre control."
        elif i == 1:
            custom_title = f"Captivating Performances Anchor {movie_title}"
            custom_text = f"What makes {movie_title} genuinely work is the grounded authenticity of the acting ensemble. The character conflicts feel honest, and the interpersonal dynamics give the high-concept narrative its true beating heart."
        elif i == 2:
            custom_title = f"Visual Craft and Sonic Texture in {movie_title}"
            custom_text = f"From the deliberate lighting choices to the dynamic audio design, {movie_title} creates an unforgettable sensory mood. Every sequence feels carefully composed to sustain viewer intrigue throughout."
        elif i == 3:
            custom_title = f"Compelling Vision with Minor Second-Act Pacing Lags"
            custom_text = f"There is an enormous amount of ambition in {movie_title}. While certain dialogue-heavy interludes in the middle act slightly slow down momentum, the film more than recovers during its intense, memorable finale."
        elif i == 4:
            custom_title = f"Thematic Depth Beyond Standard Entertainment"
            custom_text = f"Rather than settling for surface-level thrills, {movie_dir} delves into deeper themes of human perseverance and moral complexity. A film that continues to linger in the mind long after viewing."
        elif i == 5:
            custom_title = f"A Truly Satisfying Experience for Cinema Lovers"
            custom_text = f"Engaging, polished, and emotionally resonant. {movie_title} delivers everything you hope for from a top-tier {movie_genre} feature, balancing visual spectacle with genuine human stakes."
        elif i == 6:
            custom_title = f"Nuanced Storytelling That Defies Easy Expectations"
            custom_text = f"The screenplay avoids tired formulas by taking unexpected narrative turns. Even when the plot takes risky creative leaps, the cast and directional confidence keep everything compellingly grounded."
        else:
            custom_title = f"Remarkable Craftsmanship That Demands a Rewatch"
            custom_text = f"A stellar showcase of cinematic craft. The synergy between editing, direction, and acting makes {movie_title} an exhilarating journey that rewards close, repeated viewings."
            
        movie_reviews.append({
            "id": f"rev-{review_id_counter:04d}",
            "movieId": mid,
            "userName": rev_person["name"],
            "userAvatar": rev_person.get("avatar", ""),
            "initials": rev_person["initials"],
            "rating": calc_rating,
            "reviewTitle": custom_title,
            "reviewText": custom_text,
            "date": rev_date,
            "isPredefined": True,
            "isProfileUser": False
        })
        review_id_counter += 1
        
    final_reviews.extend(movie_reviews)

reviews_file_path = os.path.join("src", "data", "sampleReviews.json")
with open(reviews_file_path, "w", encoding="utf-8") as f:
    json.dump(final_reviews, f, indent=2)

print(f"sampleReviews.json regenerated with Arjun Sharma: {len(final_reviews)} reviews.")
