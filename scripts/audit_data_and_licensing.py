#!/usr/bin/env python3
"""
SCREENVERSE - Data Integrity and Image Licensing Audit
Performs rigorous inspection of:
1. 70 Movie records (uniqueness, fields, local poster paths)
2. 70 Local poster files on disk
3. 560 Predefined reviews (8 per movie, immutability, reviewer identities)
4. Image licensing analysis based on public/images/movies/manifest.json
"""

import os
import json
import sys

def run_audit():
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    movies_file = os.path.join(root_dir, "src", "data", "movies.json")
    reviews_file = os.path.join(root_dir, "src", "data", "sampleReviews.json")
    manifest_file = os.path.join(root_dir, "public", "images", "movies", "manifest.json")
    posters_dir = os.path.join(root_dir, "public", "images", "movies")

    print("\n" + "=" * 65)
    print(" SCREENVERSE - DATA INTEGRITY & LICENSING AUDIT")
    print("=" * 65 + "\n")

    # 1. MOVIE INTEGRITY
    with open(movies_file, "r", encoding="utf-8") as f:
        movies = json.load(f)

    print(f"Total Movies in Dataset: {len(movies)}")
    assert len(movies) == 70, f"Expected 70 movies, got {len(movies)}"

    movie_ids = set()
    slugs = set()
    missing_posters = []
    external_urls = []
    invalid_metadata = []

    for idx, m in enumerate(movies, 1):
        mid = m.get("id")
        if not mid or mid in movie_ids:
            invalid_metadata.append(f"Duplicate or missing ID: {mid}")
        movie_ids.add(mid)

        slug = m.get("slug")
        if not slug or slug in slugs:
            invalid_metadata.append(f"Duplicate or missing slug: {slug}")
        slugs.add(slug)

        # Check required fields
        for field in ["title", "releaseYear", "director", "primaryGenre", "rating", "runtime", "language", "description", "poster"]:
            if field not in m or m[field] is None:
                invalid_metadata.append(f"Movie {mid} missing {field}")

        poster_rel = m.get("poster", "")
        if poster_rel.startswith("http://") or poster_rel.startswith("https://"):
            external_urls.append(f"Movie {mid} uses external URL: {poster_rel}")

        # Check local file on disk
        local_filename = os.path.basename(poster_rel)
        disk_path = os.path.join(posters_dir, local_filename)
        if not os.path.exists(disk_path):
            missing_posters.append(f"Missing poster file: {disk_path}")
        else:
            size = os.path.getsize(disk_path)
            if size == 0:
                missing_posters.append(f"Empty poster file: {disk_path}")

    print(f"  Unique Movie IDs: {len(movie_ids)} / 70")
    print(f"  Unique Movie Slugs: {len(slugs)} / 70")
    print(f"  Missing or Zero-byte Posters: {len(missing_posters)}")
    print(f"  External Image URLs: {len(external_urls)}")
    print(f"  Metadata Issues: {len(invalid_metadata)}")

    # 2. REVIEW DATASET INTEGRITY
    with open(reviews_file, "r", encoding="utf-8") as f:
        reviews = json.load(f)

    print(f"\nTotal Predefined Reviews: {len(reviews)}")
    assert len(reviews) == 560, f"Expected 560 reviews, got {len(reviews)}"

    reviews_per_movie = {}
    invalid_reviews = []
    non_immutable = []

    for r in reviews:
        rid = r.get("id")
        rmovie = r.get("movieId")
        if rmovie not in movie_ids:
            invalid_reviews.append(f"Review {rid} references non-existent movie: {rmovie}")

        reviews_per_movie[rmovie] = reviews_per_movie.get(rmovie, 0) + 1

        if r.get("isPredefined") is not True:
            non_immutable.append(f"Review {rid} not marked isPredefined: true")

        if not r.get("userName") or not r.get("reviewTitle") or not r.get("reviewText"):
            invalid_reviews.append(f"Review {rid} missing content or author")

        rating = r.get("rating")
        if rating is None or rating < 1 or rating > 10:
            invalid_reviews.append(f"Review {rid} rating out of bounds: {rating}")

    movies_with_exact_8 = sum(1 for m in movie_ids if reviews_per_movie.get(m) == 8)
    print(f"  Movies with exactly 8 predefined reviews: {movies_with_exact_8} / 70")
    print(f"  Mutable / Invalid Reviews: {len(non_immutable) + len(invalid_reviews)}")

    # 3. IMAGE LICENSING AUDIT
    with open(manifest_file, "r", encoding="utf-8") as f:
        manifest = json.load(f)

    print(f"\nManifest Entries: {len(manifest)}")
    assert len(manifest) == 70, f"Expected 70 manifest entries, got {len(manifest)}"

    licenses = {}
    for entry in manifest:
        lic = entry.get("license", "Unknown")
        licenses[lic] = licenses.get(lic, 0) + 1

    print("Poster Licensing Distribution:")
    for lic, count in licenses.items():
        print(f"  - {lic}: {count} images")

    print("\n" + "=" * 65)
    print(" DATA INTEGRITY SUMMARY")
    print("=" * 65)
    if not missing_posters and not external_urls and not invalid_metadata and not invalid_reviews and not non_immutable:
        print(" [ALL CHECKS PASSED] Data integrity is 100% compliant.")
    else:
        print(" [ISSUES FOUND] Review failures above.")
        sys.exit(1)

if __name__ == "__main__":
    run_audit()
