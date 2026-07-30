import { Star } from 'lucide-react'

const reviews = [
  {
    name: "Emily Thum",
    rating: 5,
    time: "2 months ago",
    text: "I took the LLQP online courses and they were really helpful. Responsive instructors, great study materials, and lots of resources for studying.",
    bg: "#f2f6fb"
  },
  {
    name: "Amit Gogja",
    rating: 5,
    time: "2 months ago",
    text: "Nice team to help and courses to prepare your exams. After helped me to pass my exam, I upgraded the decision in the spot. I purchased the course and already started.",
    bg: "#edf7fa"
  },
  {
    name: "Shaopeng Woo",
    rating: 5,
    time: "3 months ago",
    text: "Appreciate your prompt support throughout the process.",
    bg: "#fdf3ec"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1 mb-4">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? "fill-[#fbbf24] text-[#fbbf24]" : "fill-gray-200 text-gray-200"}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-white py-14 px-4 sm:px-6 sm:py-20 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-balance text-[#1e2a4a] mb-8 sm:mb-14">
          Vipin Garg is trusted by professionals across Canada
        </h2>

        {/* Swipeable on touch, three-up from md. */}
        <ul className="-mx-4 flex list-none snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 [-ms-overflow-style:none] [scrollbar-width:none] md:mx-0 md:grid md:grid-cols-3 md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden">
          {reviews.map((review, index) => (
            <li
              key={index}
              className="w-[82vw] max-w-sm shrink-0 snap-start rounded-xl p-6 sm:p-7 md:w-auto md:max-w-none"
              style={{ backgroundColor: review.bg }}
            >
              <StarRating rating={review.rating} />
              <h4 className="font-bold text-[#1e2a4a] text-sm">{review.name}</h4>
              <p className="text-gray-500 text-xs mt-1 mb-5">{review.time}</p>
              <p className="text-gray-600 text-sm leading-relaxed text-pretty">{review.text}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
