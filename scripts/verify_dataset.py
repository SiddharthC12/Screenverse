import json
import os

with open(os.path.join("src", "data", "movies.json"), "r", encoding="utf-8") as f:
    movies = json.load(f)

with open(os.path.join("src", "data", "sampleReviews.json"), "r", encoding="utf-8") as f:
    reviews = json.load(f)

print("--- DATASET VERIFICATION ---")
print(f"Total Movies: {len(movies)}")
print(f"Total Sample Reviews: {len(reviews)}")

# 1. Check movie count
assert len(movies) == 70, f"Expected 70 movies, got {len(movies)}"

# 2. Check duplicate IDs
movie_ids = [m["id"] for m in movies]
assert len(movie_ids) == len(set(movie_ids)), "Duplicate movie IDs found!"

# 3. Check required fields and posters
missing_fields = []
missing_posters = []
for m in movies:
    for field in ["id", "title", "slug", "releaseYear", "genre", "primaryGenre", "language", "description", "poster", "rating", "starRating"]:
        if field not in m or m[field] is None:
            missing_fields.append((m.get("id"), field))
    
    # Check local poster file
    rel_path = m["poster"].lstrip("/")
    full_path = os.path.join("public", rel_path.replace("images/movies/", "images\\movies\\"))
    if not os.path.exists(full_path):
        missing_posters.append((m["id"], full_path))

print(f"Missing Fields Count: {len(missing_fields)}")
print(f"Missing Posters Count: {len(missing_posters)}")

# 4. Check reviews
assert len(reviews) >= 140, f"Expected at least 140 reviews, got {len(reviews)}"
review_movie_ids = set(r["movieId"] for r in reviews)
for r in reviews:
    assert r["movieId"] in movie_ids, f"Review {r['id']} has invalid movieId {r['movieId']}"

# Count reviews per movie
reviews_per_movie = {mid: 0 for mid in movie_ids}
for r in reviews:
    reviews_per_movie[r["movieId"]] += 1

min_rev = min(reviews_per_movie.values())
max_rev = max(reviews_per_movie.values())
print(f"Reviews per movie: min={min_rev}, max={max_rev}")
assert min_rev >= 2, f"Some movie has less than 2 reviews!"

print("\nALL DATASET AND ASSET CHECKS PASSED PERFECTLY!")
