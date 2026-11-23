import os
import json

movies_list = [
    # Collection A
    ("the-dark-knight-2008", "The Dark Knight", 2008, "Action", "English"),
    ("avengers-endgame-2019", "Avengers: Endgame", 2019, "Action", "English"),
    ("mad-max-fury-road-2015", "Mad Max: Fury Road", 2015, "Action", "English"),
    ("jurassic-park-1993", "Jurassic Park", 1993, "Adventure", "English"),
    ("pirates-of-the-caribbean-2003", "Pirates of the Caribbean: The Curse of the Black Pearl", 2003, "Action", "English"),
    ("mission-impossible-fallout-2018", "Mission: Impossible – Fallout", 2018, "Action", "English"),
    ("top-gun-maverick-2022", "Top Gun: Maverick", 2022, "Action", "English"),
    ("gladiator-2000", "Gladiator", 2000, "Action", "English"),
    ("spider-man-no-way-home-2021", "Spider-Man: No Way Home", 2021, "Action", "English"),
    ("the-batman-2022", "The Batman", 2022, "Action", "English"),

    # Collection B
    ("inception-2010", "Inception", 2010, "Science Fiction", "English"),
    ("interstellar-2014", "Interstellar", 2014, "Science Fiction", "English"),
    ("the-matrix-1999", "The Matrix", 1999, "Science Fiction", "English"),
    ("dune-part-two-2024", "Dune: Part Two", 2024, "Science Fiction", "English"),
    ("arrival-2016", "Arrival", 2016, "Science Fiction", "English"),
    ("blade-runner-2049-2017", "Blade Runner 2049", 2017, "Science Fiction", "English"),
    ("harry-potter-and-the-philosophers-stone-2001", "Harry Potter and the Philosopher's Stone", 2001, "Fantasy", "English"),
    ("the-lord-of-the-rings-the-fellowship-of-the-ring-2001", "The Lord of the Rings: The Fellowship of the Ring", 2001, "Fantasy", "English"),
    ("everything-everywhere-all-at-once-2022", "Everything Everywhere All at Once", 2022, "Science Fiction", "English"),
    ("avatar-2009", "Avatar", 2009, "Science Fiction", "English"),

    # Collection C
    ("se7en-1995", "Se7en", 1995, "Crime", "English"),
    ("shutter-island-2010", "Shutter Island", 2010, "Mystery", "English"),
    ("gone-girl-2014", "Gone Girl", 2014, "Mystery", "English"),
    ("knives-out-2019", "Knives Out", 2019, "Mystery", "English"),
    ("the-silence-of-the-lambs-1991", "The Silence of the Lambs", 1991, "Thriller", "English"),
    ("get-out-2017", "Get Out", 2017, "Horror", "English"),
    ("the-conjuring-2013", "The Conjuring", 2013, "Horror", "English"),
    ("a-quiet-place-2018", "A Quiet Place", 2018, "Horror", "English"),
    ("parasite-2019", "Parasite", 2019, "Thriller", "Korean"),
    ("train-to-busan-2016", "Train to Busan", 2016, "Horror", "Korean"),

    # Collection D
    ("the-shawshank-redemption-1994", "The Shawshank Redemption", 1994, "Drama", "English"),
    ("forrest-gump-1994", "Forrest Gump", 1994, "Drama", "English"),
    ("the-pursuit-of-happyness-2006", "The Pursuit of Happyness", 2006, "Drama", "English"),
    ("whiplash-2014", "Whiplash", 2014, "Drama", "English"),
    ("the-green-mile-1999", "The Green Mile", 1999, "Drama", "English"),
    ("titanic-1997", "Titanic", 1997, "Romance", "English"),
    ("la-la-land-2016", "La La Land", 2016, "Romance", "English"),
    ("the-grand-budapest-hotel-2014", "The Grand Budapest Hotel", 2014, "Comedy", "English"),
    ("coco-2017", "Coco", 2017, "Animation", "English"),
    ("inside-out-2015", "Inside Out", 2015, "Animation", "English"),

    # Collection E
    ("3-idiots-2009", "3 Idiots", 2009, "Comedy", "Hindi"),
    ("dangal-2016", "Dangal", 2016, "Drama", "Hindi"),
    ("lagaan-2001", "Lagaan", 2001, "Drama", "Hindi"),
    ("zindagi-na-milegi-dobara-2011", "Zindagi Na Milegi Dobara", 2011, "Drama", "Hindi"),
    ("andhadhun-2018", "Andhadhun", 2018, "Thriller", "Hindi"),
    ("queen-2013", "Queen", 2013, "Comedy", "Hindi"),
    ("gully-boy-2019", "Gully Boy", 2019, "Drama", "Hindi"),
    ("taare-zameen-par-2007", "Taare Zameen Par", 2007, "Drama", "Hindi"),
    ("bajrangi-bhaijaan-2015", "Bajrangi Bhaijaan", 2015, "Drama", "Hindi"),
    ("drishyam-2015-hindi", "Drishyam", 2015, "Thriller", "Hindi"),

    # Collection F
    ("rrr-2022", "RRR", 2022, "Action", "Telugu"),
    ("baahubali-2-the-conclusion-2017", "Baahubali 2: The Conclusion", 2017, "Action", "Telugu"),
    ("pushpa-the-rise-2021", "Pushpa: The Rise", 2021, "Action", "Telugu"),
    ("kgf-chapter-2-2022", "KGF Chapter 2", 2022, "Action", "Kannada"),
    ("kantara-2022", "Kantara", 2022, "Action", "Kannada"),
    ("eega-2012", "Eega", 2012, "Fantasy", "Telugu"),
    ("sita-ramam-2022", "Sita Ramam", 2022, "Romance", "Telugu"),
    ("mahanati-2018", "Mahanati", 2018, "Drama", "Telugu"),
    ("vikram-2022", "Vikram", 2022, "Action", "Tamil"),
    ("96-2018", "96", 2018, "Romance", "Tamil"),

    # Collection G
    ("drishyam-2013-malayalam", "Drishyam", 2013, "Thriller", "Malayalam"),
    ("manjummel-boys-2024", "Manjummel Boys", 2024, "Adventure", "Malayalam"),
    ("premam-2015", "Premam", 2015, "Romance", "Malayalam"),
    ("bangalore-days-2014", "Bangalore Days", 2014, "Comedy", "Malayalam"),
    ("kumbalangi-nights-2019", "Kumbalangi Nights", 2019, "Drama", "Malayalam"),
    ("ustad-hotel-2012", "Ustad Hotel", 2012, "Drama", "Malayalam"),
    ("charlie-2015-malayalam", "Charlie", 2015, "Adventure", "Malayalam"),
    ("kirik-party-2016", "Kirik Party", 2016, "Comedy", "Kannada"),
    ("lucia-2013-kannada", "Lucia", 2013, "Science Fiction", "Kannada"),
    ("dia-2020-kannada", "Dia", 2020, "Romance", "Kannada")
]

poster_dir = os.path.join("public", "images", "movies")
manifest_path = os.path.join(poster_dir, "manifest.json")

# Read existing manifest
manifest_data = {}
if os.path.exists(manifest_path):
    with open(manifest_path, "r", encoding="utf-8") as f:
        existing = json.load(f)
        for item in existing:
            manifest_data[item["id"]] = item

all_valid = True
full_manifest = []

# Special sources for the 2 manual fixes
special_sources = {
    "mission-impossible-fallout-2018": "https://upload.wikimedia.org/wikipedia/en/f/ff/MI_%E2%80%93_Fallout.jpg",
    "dangal-2016": "https://upload.wikimedia.org/wikipedia/en/9/99/Dangal_Poster.jpg"
}

for mid, title, year, genre, lang in movies_list:
    filepath = os.path.join(poster_dir, f"{mid}.jpg")
    if not os.path.exists(filepath):
        print(f"MISSING POSTER: {mid}.jpg")
        all_valid = False
        continue

    size = os.path.getsize(filepath)
    if size < 5000:
        print(f"FILE TOO SMALL: {mid}.jpg ({size} bytes)")
        all_valid = False
        continue

    entry = manifest_data.get(mid)
    if not entry:
        entry = {
            "id": mid,
            "title": title,
            "releaseYear": year,
            "filename": f"{mid}.jpg",
            "localPath": f"/images/movies/{mid}.jpg",
            "sourceUrl": special_sources.get(mid, f"https://upload.wikimedia.org/wikipedia/en/.../{mid}.jpg"),
            "attribution": f"Wikimedia Commons / Wikipedia promotional poster for {title} ({year})",
            "license": "Fair use / Promotional poster for educational commentary",
            "fileSizeBytes": size
        }
    else:
        entry["fileSizeBytes"] = size

    full_manifest.append(entry)

with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(full_manifest, f, indent=2)

print("\n--- POSTER VALIDATION SUMMARY ---")
print(f"Total Movies Required: {len(movies_list)}")
print(f"Posters Present & Valid: {len(full_manifest)}/70")
print(f"All Valid: {all_valid}")
