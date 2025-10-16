import { collection, onSnapshot } from 'firebase/firestore';
import { useEffect, useState } from 'react'
import { db } from '../../firebase';

function Review() {
    const [reviews, setReviews] = useState([]);  // Initialize as empty array

    useEffect(() => {
        const unsub = onSnapshot(collection(db, "Reviews"), (snapshot) => {
            const review = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setReviews(review);
        });
        return () => unsub();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Reviews</h2>
            <table className="w-full bg-white border border-gray-200 rounded shadow">
                <thead className="bg-gray-100">
                    <tr>
                        <th className="px-6 py-3 text-left">S.NO</th>
                        <th className="px-6 py-3 text-left">Employee ID</th>
                        <th className="px-6 py-3 text-left">Customer Name</th>
                        <th className="px-6 py-3 text-left">Customer Phone Number</th>
                        <th className="px-6 py-3 text-left">Customer E-mail</th>
                        <th className="px-6 py-3 text-left">Staff Rating</th>
                        <th className="px-6 py-3 text-left">Feedback</th>
                    </tr>
                </thead>
                <tbody>
                    {reviews.map((review, index) => (
                        <tr key={review.id} className="border-b">
                            <td className="px-6 py-4">{index + 1}</td>
                            <td className="px-6 py-4">{review.staffId}</td>
                            <td className="px-6 py-4">{review.name}</td>
                            <td className="px-6 py-4">{review.phone}</td>
                            <td className="px-6 py-4">{review.email}</td>
                            <td className="px-6 py-4">{review.rating}</td>
                            <td className="px-6 py-4">{review.feedback}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Review;
