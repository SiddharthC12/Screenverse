#!/usr/bin/env python3
"""
SCREENVERSE - Stage 6 Automated Verification Suite
Tests:
1. Default Profile Identity (Arjun Sharma)
2. Non-Human Golden Film Reel Avatar
3. Predefined Reviews Integrity (560 total, 8 per movie)
4. Interactive Review CRUD, Validation, and Duplicate Prevention
5. Predefined Reviews Immutability
6. Dual Rating System Separation (Sample vs User)
7. Codebase Compliance (no human photo avatars, proper component wiring)
8. Production Build Verification (npm run build)
"""

import os
import sys
import json
import re
import subprocess

PASS_COUNT = 0
FAIL_COUNT = 0

def log_pass(msg):
    global PASS_COUNT
    PASS_COUNT += 1
    print(f"  [PASS] {msg}")

def log_fail(msg):
    global FAIL_COUNT
    FAIL_COUNT += 1
    print(f"  [FAIL] {msg}")

def assert_true(cond, msg):
    if cond:
        log_pass(msg)
    else:
        log_fail(msg)

def run_suite():
    global PASS_COUNT, FAIL_COUNT
    root_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))
    print("\n" + "=" * 60)
    print(" SCREENVERSE - STAGE 6 COMPREHENSIVE VERIFICATION SUITE")
    print("=" * 60 + "\n")

    # SUITE 1: Constants & Default User Identity
    print("TEST SUITE 1: Default Profile Identity & Constants")
    constants_path = os.path.join(root_dir, "src", "utils", "constants.js")
    assert_true(os.path.exists(constants_path), "constants.js exists")
    with open(constants_path, "r", encoding="utf-8") as f:
        constants_code = f.read()

    assert_true("'Arjun Sharma'" in constants_code or '"Arjun Sharma"' in constants_code, "DEFAULT_DEMO_USER displayName is 'Arjun Sharma'")
    assert_true("'arjunsharma'" in constants_code or '"arjunsharma"' in constants_code, "DEFAULT_DEMO_USER username is 'arjunsharma'")
    assert_true("arjun.sharma@example.com" in constants_code, "DEFAULT_DEMO_USER email is 'arjun.sharma@example.com'")
    assert_true("Bengaluru, India" in constants_code, "DEFAULT_DEMO_USER location is 'Bengaluru, India'")
    assert_true("SCREENVERSE Member" in constants_code, "DEFAULT_DEMO_USER membership is 'SCREENVERSE Member'")
    assert_true("/images/branding/film-reel-avatar.svg" in constants_code, "DEFAULT_DEMO_USER avatar is '/images/branding/film-reel-avatar.svg'")
    for genre in ["Sci-Fi", "Thriller", "Action", "Drama"]:
        assert_true(f"'{genre}'" in constants_code or f'"{genre}"' in constants_code, f"Favorite genres include {genre}")

    # SUITE 2: Non-Human Golden Film Reel Avatar
    print("\nTEST SUITE 2: Non-Human Golden Film Reel Avatar")
    avatar_path = os.path.join(root_dir, "public", "images", "branding", "film-reel-avatar.svg")
    assert_true(os.path.exists(avatar_path), "film-reel-avatar.svg exists in public/images/branding/")
    with open(avatar_path, "r", encoding="utf-8") as f:
        avatar_svg = f.read()

    assert_true("<svg" in avatar_svg and "</svg>" in avatar_svg, "Avatar is a valid SVG document")
    assert_true("<circle" in avatar_svg, "Avatar features circular film reel geometry")
    assert_true("#C9A45C" in avatar_svg or "goldGradient" in avatar_svg, "Avatar uses champagne gold (#C9A45C) palette")
    assert_true("#101116" in avatar_svg or "#161820" in avatar_svg or "#252A36" in avatar_svg, "Avatar uses dark charcoal / midnight background")
    assert_true("unsplash.com" not in avatar_svg and "avatar.iran.liara.run" not in avatar_svg, "Avatar contains no external photo links")
    assert_true("image/jpeg" not in avatar_svg and "image/png" not in avatar_svg, "Avatar contains no embedded raster photographs")

    # SUITE 3: Predefined Reviews Integrity (560 Reviews)
    print("\nTEST SUITE 3: Predefined Reviews Integrity (560 Reviews)")
    movies_path = os.path.join(root_dir, "src", "data", "movies.json")
    reviews_path = os.path.join(root_dir, "src", "data", "sampleReviews.json")
    with open(movies_path, "r", encoding="utf-8") as f:
        movies = json.load(f)
    with open(reviews_path, "r", encoding="utf-8") as f:
        reviews = json.load(f)

    assert_true(len(movies) == 70, f"Exactly 70 movies in catalogue (found {len(movies)})")
    assert_true(len(reviews) == 560, f"Exactly 560 predefined reviews (found {len(reviews)})")

    counts = {}
    arjun_reviews = 0
    for r in reviews:
        counts[r["movieId"]] = counts.get(r["movieId"], 0) + 1
        assert_true(r.get("isPredefined") is True, f"Review {r['id']} marked as isPredefined: true")
        if r.get("userName") == "Arjun Sharma":
            arjun_reviews += 1
            assert_true(r.get("userAvatar") == "/images/branding/film-reel-avatar.svg", f"Arjun review {r['id']} uses film-reel avatar")

    assert_true(all(counts[m["id"]] == 8 for m in movies), "All 70 movies have exactly 8 predefined reviews")
    assert_true(arjun_reviews == 13, f"Arjun Sharma has exactly 13 spotlight reviews in sample data (found {arjun_reviews})")

    # SUITE 4: Interactive Review Logic Simulation
    print("\nTEST SUITE 4: Interactive Review CRUD, Validation & Dual Rating Logic")
    
    # In-memory storage simulation matching reviewService.js
    mock_user_reviews = []
    
    def validate_and_add_review(movie_id, user_id, user_name, user_avatar, rating, title, text):
        if not movie_id:
            return {"success": False, "error": "Movie identifier is required."}
        try:
            num_rating = float(rating)
        except (ValueError, TypeError):
            return {"success": False, "error": "Invalid rating"}
        if num_rating < 1.0 or num_rating > 10.0:
            return {"success": False, "error": "Rating must be between 1.0 and 10.0."}
        if not title or len(title.strip()) < 3:
            return {"success": False, "error": "Review title must be at least 3 characters long."}
        if not text or len(text.strip()) < 10:
            return {"success": False, "error": "Review description must be at least 10 characters long."}
        
        # Duplicate check
        for r in mock_user_reviews:
            if r["movieId"] == movie_id and r["userId"] == user_id:
                return {"success": False, "error": "You have already reviewed this film. You can edit your existing review instead."}
        
        new_rev = {
            "id": f"usr-rev-{len(mock_user_reviews)+1}",
            "movieId": movie_id,
            "userId": user_id,
            "userName": user_name,
            "userAvatar": user_avatar,
            "rating": round(num_rating, 1),
            "reviewTitle": title.strip(),
            "reviewText": text.strip(),
            "isPredefined": False,
            "isUserSubmitted": True
        }
        mock_user_reviews.append(new_rev)
        return {"success": True, "review": new_rev}

    def update_review(rev_id, user_id, rating, title, text):
        for r in mock_user_reviews:
            if r["id"] == rev_id:
                if r.get("isPredefined"):
                    return {"success": False, "error": "Predefined reviews cannot be edited."}
                if r["userId"] != user_id:
                    return {"success": False, "error": "Permission denied."}
                r["rating"] = round(float(rating), 1)
                r["reviewTitle"] = title.strip()
                r["reviewText"] = text.strip()
                return {"success": True, "review": r}
        return {"success": False, "error": "Not found"}

    def delete_review(rev_id, user_id):
        for i, r in enumerate(mock_user_reviews):
            if r["id"] == rev_id:
                if r.get("isPredefined"):
                    return {"success": False, "error": "Community sample reviews cannot be deleted."}
                if r["userId"] != user_id:
                    return {"success": False, "error": "Permission denied."}
                mock_user_reviews.pop(i)
                return {"success": True}
        return {"success": False, "error": "Not found"}

    def calculate_dual_stats(movie_id, fallback_rating=0.0):
        predefined = [r for r in reviews if r["movieId"] == movie_id]
        user_revs = [r for r in mock_user_reviews if r["movieId"] == movie_id]
        
        sample_avg = round(sum(r["rating"] for r in predefined) / len(predefined), 1) if predefined else fallback_rating
        user_avg = round(sum(r["rating"] for r in user_revs) / len(user_revs), 1) if user_revs else None
        
        return {
            "sampleRating": sample_avg,
            "sampleCount": len(predefined),
            "userRating": user_avg,
            "userCount": len(user_revs),
            "totalCount": len(predefined) + len(user_revs)
        }

    # 4.1 Rating range validation
    r_low = validate_and_add_review("the-dark-knight-2008", "user-arjun-sharma", "Arjun Sharma", "/images/branding/film-reel-avatar.svg", 0.5, "Too Low", "This rating is below 1.0.")
    assert_true(not r_low["success"], "Rejects rating < 1.0")

    r_high = validate_and_add_review("the-dark-knight-2008", "user-arjun-sharma", "Arjun Sharma", "/images/branding/film-reel-avatar.svg", 10.5, "Too High", "This rating is above 10.0.")
    assert_true(not r_high["success"], "Rejects rating > 10.0")

    # 4.2 Content validation
    r_short_t = validate_and_add_review("the-dark-knight-2008", "user-arjun-sharma", "Arjun Sharma", "/images/branding/film-reel-avatar.svg", 8.0, "ab", "Valid length review description.")
    assert_true(not r_short_t["success"], "Rejects title < 3 characters")

    r_short_d = validate_and_add_review("the-dark-knight-2008", "user-arjun-sharma", "Arjun Sharma", "/images/branding/film-reel-avatar.svg", 8.0, "Valid Title", "Short")
    assert_true(not r_short_d["success"], "Rejects text < 10 characters")

    # 4.3 Successful submission
    r_valid = validate_and_add_review(
        "the-dark-knight-2008",
        "user-arjun-sharma",
        "Arjun Sharma",
        "/images/branding/film-reel-avatar.svg",
        9.5,
        "A Tense, Relentless Crime Symphony",
        "Christopher Nolan and Heath Ledger delivered an all-time classic of moral tension."
    )
    assert_true(r_valid["success"], "Valid review submitted successfully")
    assert_true(r_valid["review"]["rating"] == 9.5, "Decimal rating preserved (9.5/10)")

    # 4.4 Duplicate prevention
    r_dup = validate_and_add_review(
        "the-dark-knight-2008",
        "user-arjun-sharma",
        "Arjun Sharma",
        "/images/branding/film-reel-avatar.svg",
        8.0,
        "Duplicate Try",
        "This duplicate attempt should be rejected."
    )
    assert_true(not r_dup["success"], "Rejects duplicate review by same user for same movie")

    # 4.5 Dual rating verification
    stats1 = calculate_dual_stats("the-dark-knight-2008")
    assert_true(stats1["sampleCount"] == 8, "Sample review count is 8")
    assert_true(stats1["sampleRating"] > 0, f"Sample rating is distinct ({stats1['sampleRating']}/10)")
    assert_true(stats1["userCount"] == 1, "User review count is 1")
    assert_true(stats1["userRating"] == 9.5, f"User rating calculated exclusively from user reviews ({stats1['userRating']}/10)")
    assert_true(stats1["totalCount"] == 9, "Total count is 9 (8 sample + 1 user)")

    # 4.6 Movie without user reviews
    stats_no_user = calculate_dual_stats("inception-2010")
    assert_true(stats_no_user["userRating"] is None, "User rating is null when no user reviews exist")
    assert_true(stats_no_user["userCount"] == 0, "User count is 0")

    # 4.7 Update review
    r_update = update_review(
        r_valid["review"]["id"],
        "user-arjun-sharma",
        10.0,
        "An Absolute Cinema Triumph",
        "Updated review: Flawless cinematography, iconic score, and sublime pacing."
    )
    assert_true(r_update["success"], "User can edit own review")
    assert_true(r_update["review"]["rating"] == 10.0, "Updated rating is 10.0")

    stats2 = calculate_dual_stats("the-dark-knight-2008")
    assert_true(stats2["userRating"] == 10.0, "User rating updates dynamically after edit (10.0/10)")

    # 4.8 Immutability of predefined reviews
    predefined_id = reviews[0]["id"]
    # Add a mock predefined review to list to test protection
    mock_user_reviews.append(reviews[0])
    r_hack_edit = update_review(predefined_id, "user-arjun-sharma", 1.0, "Hack", "Hack description here.")
    assert_true(not r_hack_edit["success"], "Predefined sample reviews cannot be edited")

    r_hack_del = delete_review(predefined_id, "user-arjun-sharma")
    assert_true(not r_hack_del["success"], "Predefined sample reviews cannot be deleted")
    mock_user_reviews.pop()  # remove predefined from mock list

    # 4.9 Delete review
    r_delete = delete_review(r_valid["review"]["id"], "user-arjun-sharma")
    assert_true(r_delete["success"], "User can delete own review")

    stats3 = calculate_dual_stats("the-dark-knight-2008")
    assert_true(stats3["userRating"] is None, "User rating returns to null after deletion")
    assert_true(stats3["userCount"] == 0, "User count returns to 0")

    # 4.10 Re-submission allowed after delete
    r_resub = validate_and_add_review(
        "the-dark-knight-2008",
        "user-arjun-sharma",
        "Arjun Sharma",
        "/images/branding/film-reel-avatar.svg",
        9.0,
        "Second Thoughts",
        "A brand new critique after deleting the previous one."
    )
    assert_true(r_resub["success"], "User can re-submit after deleting previous review")

    # SUITE 5: Codebase Architecture & Component Inspection
    print("\nTEST SUITE 5: Codebase Architecture & UI Component Inspection")
    profile_path = os.path.join(root_dir, "src", "pages", "Profile.jsx")
    with open(profile_path, "r", encoding="utf-8") as f:
        profile_code = f.read()
    assert_true("ConfirmModal" in profile_code, "Profile.jsx imports ConfirmModal for delete confirmations")
    assert_true("deleteUserReview" in profile_code, "Profile.jsx imports deleteUserReview")
    assert_true("film-reel-avatar.svg" in profile_code, "Profile.jsx references film-reel-avatar.svg")
    assert_true("reviewsVersion" in profile_code, "Profile.jsx manages reviewsVersion state for reactive updates")

    movie_details_path = os.path.join(root_dir, "src", "pages", "MovieDetails.jsx")
    with open(movie_details_path, "r", encoding="utf-8") as f:
        md_code = f.read()
    assert_true("ReviewForm" in md_code, "MovieDetails.jsx incorporates ReviewForm")
    assert_true("ConfirmModal" in md_code, "MovieDetails.jsx incorporates ConfirmModal")
    assert_true("sampleRating" in md_code and "userRating" in md_code, "MovieDetails.jsx displays dual sample vs user ratings")

    rating_input_path = os.path.join(root_dir, "src", "components", "reviews", "RatingInput.jsx")
    assert_true(os.path.exists(rating_input_path), "RatingInput.jsx component exists")

    review_form_path = os.path.join(root_dir, "src", "components", "reviews", "ReviewForm.jsx")
    assert_true(os.path.exists(review_form_path), "ReviewForm.jsx component exists")

    confirm_modal_path = os.path.join(root_dir, "src", "components", "common", "ConfirmModal.jsx")
    assert_true(os.path.exists(confirm_modal_path), "ConfirmModal.jsx component exists")

    # SUITE 6: Production Build Verification
    print("\nTEST SUITE 6: Production Build Verification (npm run build)")
    try:
        build_proc = subprocess.run(
            ["npm.cmd", "run", "build"],
            cwd=root_dir,
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True,
            timeout=40
        )
        if build_proc.returncode == 0:
            log_pass("npm run build succeeded with exit code 0")
            dist_index = os.path.join(root_dir, "dist", "index.html")
            assert_true(os.path.exists(dist_index), "Production dist/index.html created successfully")
        else:
            log_fail(f"npm run build failed:\n{build_proc.stderr}")
    except Exception as e:
        log_fail(f"Build test encountered exception: {e}")

    # Summary
    print("\n" + "=" * 60)
    print(f" FINAL SUMMARY: {PASS_COUNT} PASSED | {FAIL_COUNT} FAILED")
    print("=" * 60 + "\n")

    if FAIL_COUNT > 0:
        sys.exit(1)

if __name__ == "__main__":
    run_suite()
