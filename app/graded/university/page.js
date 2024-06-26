"use client";
import React from 'react';
import Link from 'next/link';
import { supabase } from "@/backend/client";
import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from 'next/navigation';

function useGetReviews(uname) {
    const [review, setReviews] = useState([]);

    useEffect(() => {
        getRev()
    }, [])

    async function getRev(){
        const { data: unireviews, error } = await supabase
            .from('unireviews')
            .select('uname, rating, reviewtext')

        setReviews(unireviews)
    }

    var arr = []
    review.forEach(element => {
        if (element.uname == uname) {
            var rating = element.rating;
            var comment = element.reviewtext;
            arr.push({rating, comment})
        }
    });

    return arr;
}

const GradedUniversityPageContent = () => {
    const searchParams = useSearchParams();
    const reviewarr = useGetReviews(searchParams.get("uname"));

    // Dummy data for now. We will pull this data from the backend. 
    const gradedUniversity = {
        universityName: searchParams.get("uname"),
        averageRating: searchParams.get("grade"), 
        reviews: reviewarr
    };

    //may add more comments later. Kinda tired today (Sorry!).
    return (
        <div className='outerContainer'>
            <div className='mainContainer'>
                <div>
                    <h1 style={styles.heading}>{gradedUniversity.universityName}</h1>
                </div>
                <div>
                    <h2 style={styles.subHeading}>Average Rating:
                        <div className='ratingLetter'>
                            {gradedUniversity.averageRating}
                        </div>
                    </h2>
                </div>
                <div style={styles.reviews}>
                    <h2 style={styles.subHeading}>Reviews:</h2>
                    {gradedUniversity.reviews.map((review, index) => (
                        <div key={index} style={styles.review}>
                            {/* <h3>{review.username}</h3> */}
                            <div>
                                <p>
                                    <strong>Rating:</strong>
                                    <div className='ratingLetter'>
                                        {review.rating}
                                    </div>
                                </p>
                            </div>
                            <div>
                                <p>
                                    <strong>Comment:</strong>
                                    <div>
                                        {review.comment}
                                    </div>
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div style={styles.buttonContainer}>
                <Link href={{
                    pathname: "/rating/university",
                    query: {
                        uid: searchParams.get("uid"),
                        uname: searchParams.get("uname"),
                        grade: searchParams.get("grade")
                    }
                }} 
                >
                    <button style={styles.button}>Write a Review</button>
                </Link>
                </div>
            </div>
        </div>
    );
};

const GradedUniversityPage = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <GradedUniversityPageContent />
        </Suspense>
    );
};

export default GradedUniversityPage;

// CSS styles
const styles = {
    container: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: '20px',
        color: '#FFFFFF',
    },
    heading: {
        fontSize: '2em',
        textAlign: 'center',
        marginBottom: '20px',
    },
    subHeading: {
        fontSize: '1.5em',
        marginBottom: '10px',
    },
    reviews: {
        marginTop: '20px',
    },
    review: {
        background: '#2C2F33',
        padding: '20px',
        borderRadius: '5px',
        marginBottom: '20px',
    },

};
