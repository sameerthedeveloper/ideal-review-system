
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { collection, addDoc } from 'firebase/firestore'
import { db } from '../firebase'

export default function MainReview() {
  const { staffId } = useParams()

  // Controlled inputs
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [rating, setRating] = useState(null) // number | null
  const [feedback, setFeedback] = useState('')

  const handleRatingChange = (e) => {
    setRating(Number(e.target.value))
  }

  const displayData = () => {
    const data = {
      staffId: staffId ?? null,
      name,
      phone,
      email,
      rating,     // already a number
      feedback,
    }
    console.log('SUBMIT DATA ->', data)
    submitFeedback()
    // TODO: send to Firestore here
  }
    const data = {
      staffId: staffId ?? null,
      name,
      phone,
      email,
      rating,
      feedback,
    }

  const submitFeedback = async () => {
  

    try {
      await addDoc(collection(db, "Reviews"), data)
      alert("Feedback submitted successfully!")
    } catch (error) {
      console.error("Error submitting feedback:", error)
      alert("Failed to submit feedback.")
    }
  }

  return (
    <>
      <div className="flex h-screen flex-col">
        <div className="border-b border-gray-300 p-5 shadow">
          <h1 className="text-2xl font-bold">
            <span className="text-red-500">Ideal</span>{' '}
            <span className="text-red-400">Traders</span> - Feedback Form
          </h1>
        </div>

        {/* Staff section */}
        <div className="m-2 flex flex-col gap-2 rounded-lg border bg-red-300 p-3">
          <h2 className="ml-1 text-xs font-bold">Staff ID</h2>
          <p className="w-full rounded-lg border bg-red-200 p-2 text-center">
            {staffId ?? '-'}
          </p>
        </div>

        {/* Name */}
        <div className="m-2 flex flex-col gap-2 rounded-lg border bg-red-300 p-3">
          <h2 className="ml-1 text-xs font-bold">Name</h2>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border bg-red-200 p-2"
          />
        </div>

        {/* Phone */}
        <div className="m-2 flex flex-col gap-2 rounded-lg border bg-red-300 p-3">
          <h2 className="ml-1 text-xs font-bold">Phone Number</h2>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-lg border bg-red-200 p-2"
            inputMode="numeric"
          />
        </div>

        {/* Email */}
        <div className="m-2 flex flex-col gap-2 rounded-lg border bg-red-300 p-3">
          <h2 className="ml-1 text-xs font-bold">E-Mail</h2>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border bg-red-200 p-2"
          />
        </div>

        {/* Rating */}
        <div className="m-2 flex flex-col gap-2 rounded-lg border bg-red-300 p-3">
          <h2 className="ml-1 text-xs font-bold">Ratings</h2>
          <div className="flex w-full justify-center rounded-lg border bg-red-200 p-5">
            <div className="rating flex gap-1">
              {[1, 2, 3, 4, 5].map((num) => (
                <input
                  key={num}
                  type="radio"
                  name="rating"
                  value={num}
                  onChange={handleRatingChange}
                  checked={rating === num}
                  className="mask mask-star-2 bg-black"
                  aria-label={`${num} star`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm">Selected Rating: {rating ?? '-'}</p>
        </div>

        {/* Feedback */}
        <div className="m-2 flex flex-col gap-2 rounded-lg border bg-red-300 p-3">
          <h2 className="ml-1 text-xs font-bold">Any Feedback On Them</h2>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            className="w-full rounded-lg border bg-red-200 p-2"
          />
        </div>

        <button
          className="m-2 mx-3 rounded-lg border bg-red-400 p-3 font-bold"
          type="button"
          onClick={displayData}
        >
          Submit
        </button>
      </div>
    </>
  )
}
