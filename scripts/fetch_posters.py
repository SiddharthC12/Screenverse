import urllib.request
import urllib.parse
import json
import os
import time

movies_list = [
    # Collection A
    ("the-dark-knight-2008", "The Dark Knight", 2008, "The_Dark_Knight"),
    ("avengers-endgame-2019", "Avengers: Endgame", 2019, "Avengers:_Endgame"),
    ("mad-max-fury-road-2015", "Mad Max: Fury Road", 2015, "Mad_Max:_Fury_Road"),
    ("jurassic-park-1993", "Jurassic Park", 1993, "Jurassic_Park_(film)"),
    ("pirates-of-the-caribbean-2003", "Pirates of the Caribbean: The Curse of the Black Pearl", 2003, "Pirates_of_the_Caribbean:_The_Curse_of_the_Black_Pearl"),
    ("mission-impossible-fallout-2018", "Mission: Impossible – Fallout", 2018, "Mission:_Impossible_–_Fallout"),
    ("top-gun-maverick-2022", "Top Gun: Maverick", 2022, "Top_Gun:_Maverick"),
    ("gladiator-2000", "Gladiator", 2000, "Gladiator_(2000_film)"),
    ("spider-man-no-way-home-2021", "Spider-Man: No Way Home", 2021, "Spider-Man:_No_Way_Home"),
    ("the-batman-2022", "The Batman", 2022, "The_Batman_(film)"),

    # Collection B
    ("inception-2010", "Inception", 2010, "Inception"),
    ("interstellar-2014", "Interstellar", 2014, "Interstellar_(film)"),
    ("the-matrix-1999", "The Matrix", 1999, "The_Matrix"),
    ("dune-part-two-2024", "Dune: Part Two", 2024, "Dune:_Part_Two"),
    ("arrival-2016", "Arrival", 2016, "Arrival_(film)"),
    ("blade-runner-2049-2017", "Blade Runner 2049", 2017, "Blade_Runner_2049"),
    ("harry-potter-and-the-philosophers-stone-2001", "Harry Potter and the Philosopher's Stone", 2001, "Harry_Potter_and_the_Philosopher%27s_Stone_(film)"),
    ("the-lord-of-the-rings-the-fellowship-of-the-ring-2001", "The Lord of the Rings: The Fellowship of the Ring", 2001, "The_Lord_of_the_Rings:_The_Fellowship_of_the_Ring"),
    ("everything-everywhere-all-at-once-2022", "Everything Everywhere All at Once", 2022, "Everything_Everywhere_All_at_Once"),
    ("avatar-2009", "Avatar", 2009, "Avatar_(2009_film)"),

    # Collection C
    ("se7en-1995", "Se7en", 1995, "Seven_(1995_film)"),
    ("shutter-island-2010", "Shutter Island", 2010, "Shutter_Island_(film)"),
    ("gone-girl-2014", "Gone Girl", 2014, "Gone_Girl_(film)"),
    ("knives-out-2019", "Knives Out", 2019, "Knives_Out"),
    ("the-silence-of-the-lambs-1991", "The Silence of the Lambs", 1991, "The_Silence_of_the_Lambs_(film)"),
    ("get-out-2017", "Get Out", 2017, "Get_Out"),
    ("the-conjuring-2013", "The Conjuring", 2013, "The_Conjuring"),
    ("a-quiet-place-2018", "A Quiet Place", 2018, "A_Quiet_Place"),
    ("parasite-2019", "Parasite", 2019, "Parasite_(2019_film)"),
    ("train-to-busan-2016", "Train to Busan", 2016, "Train_to_Busan"),

    # Collection D
    ("the-shawshank-redemption-1994", "The Shawshank Redemption", 1994, "The_Shawshank_Redemption"),
    ("forrest-gump-1994", "Forrest Gump", 1994, "Forrest_Gump"),
    ("the-pursuit-of-happyness-2006", "The Pursuit of Happyness", 2006, "The_Pursuit_of_Happyness"),
    ("whiplash-2014", "Whiplash", 2014, "Whiplash_(2014_film)"),
    ("the-green-mile-1999", "The Green Mile", 1999, "The_Green_Mile_(film)"),
    ("titanic-1997", "Titanic", 1997, "Titanic_(1997_film)"),
    ("la-la-land-2016", "La La Land", 2016, "La_La_Land"),
    ("the-grand-budapest-hotel-2014", "The Grand Budapest Hotel", 2014, "The_Grand_Budapest_Hotel"),
    ("coco-2017", "Coco", 2017, "Coco_(2017_film)"),
    ("inside-out-2015", "Inside Out", 2015, "Inside_Out_(2015_film)"),

    # Collection E
    ("3-idiots-2009", "3 Idiots", 2009, "3_Idiots"),
    ("dangal-2016", "Dangal", 2016, "Dangal_(film)"),
    ("lagaan-2001", "Lagaan", 2001, "Lagaan"),
    ("zindagi-na-milegi-dobara-2011", "Zindagi Na Milegi Dobara", 2011, "Zindagi_Na_Milegi_Dobara"),
    ("andhadhun-2018", "Andhadhun", 2018, "Andhadhun"),
    ("queen-2013", "Queen", 2013, "Queen_(2013_film)"),
    ("gully-boy-2019", "Gully Boy", 2019, "Gully_Boy"),
    ("taare-zameen-par-2007", "Taare Zameen Par", 2007, "Taare_Zameen_Par"),
    ("bajrangi-bhaijaan-2015", "Bajrangi Bhaijaan", 2015, "Bajrangi_Bhaijaan"),
    ("drishyam-2015-hindi", "Drishyam", 2015, "Drishyam_(2015_film)"),

    # Collection F
    ("rrr-2022", "RRR", 2022, "RRR"),
    ("baahubali-2-the-conclusion-2017", "Baahubali 2: The Conclusion", 2017, "Baahubali_2:_The_Conclusion"),
    ("pushpa-the-rise-2021", "Pushpa: The Rise", 2021, "Pushpa:_The_Rise"),
    ("kgf-chapter-2-2022", "KGF Chapter 2", 2022, "K.G.F:_Chapter_2"),
    ("kantara-2022", "Kantara", 2022, "Kantara_(film)"),
    ("eega-2012", "Eega", 2012, "Eega"),
    ("sita-ramam-2022", "Sita Ramam", 2022, "Sita_Ramam"),
    ("mahanati-2018", "Mahanati", 2018, "Mahanati"),
    ("vikram-2022", "Vikram", 2022, "Vikram_(2022_film)"),
    ("96-2018", "96", 2018, "96_(film)"),

    # Collection G
    ("drishyam-2013-malayalam", "Drishyam", 2013, "Drishyam_(2013_film)"),
    ("manjummel-boys-2024", "Manjummel Boys", 2024, "Manjummel_Boys"),
    ("premam-2015", "Premam", 2015, "Premam"),
    ("bangalore-days-2014", "Bangalore Days", 2014, "Bangalore_Days"),
    ("kumbalangi-nights-2019", "Kumbalangi Nights", 2019, "Kumbalangi_Nights"),
    ("ustad-hotel-2012", "Ustad Hotel", 2012, "Ustad_Hotel"),
    ("charlie-2015-malayalam", "Charlie", 2015, "Charlie_(2015_Malayalam_film)"),
    ("kirik-party-2016", "Kirik Party", 2016, "Kirik_Party"),
    ("lucia-2013-kannada", "Lucia", 2013, "Lucia_(film)"),
    ("dia-2020-kannada", "Dia", 2020, "Dia_(film)")
]

headers = {
    'User-Agent': 'SCREENVERSE-CollegeProject/1.0 (academic mini-project; student@screenverse.app)'
}

output_dir = os.path.join("public", "images", "movies")
os.makedirs(output_dir, exist_ok=True)

manifest = []
failed = []

print(f"Total movies to fetch: {len(movies_list)}")

for idx, (mid, title, year, wiki_slug) in enumerate(movies_list, 1):
    dest_path = os.path.join(output_dir, f"{mid}.jpg")
    url = f"https://en.wikipedia.org/api/rest_v1/page/summary/{wiki_slug}"
    
    img_url = None
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req, timeout=10) as resp:
            data = json.loads(resp.read().decode())
            thumb = data.get("thumbnail") or data.get("originalimage")
            if thumb and "source" in thumb:
                img_url = thumb["source"]
    except Exception as e:
        print(f"[{idx}/70] Error querying Wikipedia for {title}: {e}")

    if img_url:
        try:
            img_req = urllib.request.Request(img_url, headers=headers)
            with urllib.request.urlopen(img_req, timeout=15) as img_resp:
                img_data = img_resp.read()
                if len(img_data) > 1000:
                    with open(dest_path, "wb") as f:
                        f.write(img_data)
                    print(f"[{idx}/70] SUCCESS: {mid}.jpg ({len(img_data)} bytes)")
                    manifest.append({
                        "id": mid,
                        "title": title,
                        "releaseYear": year,
                        "filename": f"{mid}.jpg",
                        "localPath": f"/images/movies/{mid}.jpg",
                        "sourceUrl": img_url,
                        "attribution": f"Wikimedia Commons / Wikipedia promotional poster for {title} ({year})",
                        "license": "Fair use / Promotional poster for educational commentary",
                        "fileSizeBytes": len(img_data)
                    })
                else:
                    failed.append((mid, title, "File size too small (<1KB)"))
        except Exception as e:
            failed.append((mid, title, f"Download failed: {e}"))
    else:
        failed.append((mid, title, "No thumbnail returned from API"))
    
    time.sleep(0.15)

manifest_path = os.path.join(output_dir, "manifest.json")
with open(manifest_path, "w", encoding="utf-8") as f:
    json.dump(manifest, f, indent=2)

print("\n--- RESULTS ---")
print(f"Downloaded: {len(manifest)}/70")
print(f"Failed: {len(failed)}")
if failed:
    for f in failed:
        print("FAILED:", f)
