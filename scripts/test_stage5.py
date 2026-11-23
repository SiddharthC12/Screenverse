# scripts/test_stage5.py
import json
import os

print("=== SCREENVERSE STAGE 5 VERIFICATION ===")

# 1. Verify Movies
with open("src/data/movies.json", "r", encoding="utf-8") as f:
    movies = json.load(f)
assert len(movies) == 70, f"Expected 70 movies, found {len(movies)}"
movie_ids = set(m["id"] for m in movies)
print(f"[PASS] 70 Movies verified.")

# 2. Verify Expanded Reviews
with open("src/data/sampleReviews.json", "r", encoding="utf-8") as f:
    reviews = json.load(f)

assert len(reviews) == 560, f"Expected 560 reviews, found {len(reviews)}"
print(f"[PASS] Total Reviews: {len(reviews)} (560/560)")

# Check count per movie
counts = {}
alex_reviews = []
for r in reviews:
    mid = r["movieId"]
    assert mid in movie_ids, f"Invalid movieId {mid}"
    counts[mid] = counts.get(mid, 0) + 1
    assert r["rating"] >= 1.0 and r["rating"] <= 10.0, f"Invalid rating {r['rating']}"
    assert len(r["reviewTitle"].strip()) > 0, "Empty review title"
    assert len(r["reviewText"].strip()) > 0, "Empty review text"
    assert len(r["userName"].strip()) > 0, "Empty reviewer name"
    if r["userName"] == "Alex Morgan":
        alex_reviews.append(r)

assert len(counts) == 70, "Not all movies have reviews"
min_c = min(counts.values())
max_c = max(counts.values())
assert min_c == 8 and max_c == 8, f"Expected exactly 8 reviews per movie, got min={min_c}, max={max_c}"
print(f"[PASS] Every movie has exactly 8 reviews (min={min_c}, max={max_c}).")

# Check Alex Morgan's reviews
print(f"[PASS] Alex Morgan has {len(alex_reviews)} authored reviews across the collection.")
alex_movie_ids = [r["movieId"] for r in alex_reviews]
assert len(alex_movie_ids) == len(set(alex_movie_ids)), "Alex Morgan reviewed the same movie multiple times"

alex_avg = sum(r["rating"] for r in alex_reviews) / len(alex_reviews)
print(f"[PASS] Alex Morgan Average Rating: {alex_avg:.1f} / 10")

print("\nALL STAGE 5 DATASET AND INTEGRATION CHECKS COMPLETED WITH 100% SUCCESS!")
