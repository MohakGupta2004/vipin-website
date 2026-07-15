import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

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
    <section className="bg-white py-20 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e2a4a] mb-14">
          Vipin Garg is trusted by professionals across Canada
        </h2>

        <div className="relative">
          <button
            aria-label="Previous testimonials"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-2 md:-translate-x-6 w-11 h-11 bg-[#e5f1f7] rounded-full flex items-center justify-center hover:bg-[#d3e7f1] transition-colors z-10"
          >
            <ChevronLeft size={22} className="text-[#219ebc]" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-8 md:px-14">
            {reviews.map((review, index) => (
              <div
                key={index}
                className="rounded-xl p-7"
                style={{ backgroundColor: review.bg }}
              >
                <StarRating rating={review.rating} />
                <h4 className="font-bold text-[#1e2a4a] text-sm">{review.name}</h4>
                <p className="text-gray-500 text-xs mt-1 mb-5">{review.time}</p>
                <p className="text-gray-600 text-sm leading-relaxed">{review.text}</p>
              </div>
            ))}
          </div>

          <button
            aria-label="Next testimonials"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-2 md:translate-x-6 w-11 h-11 bg-[#fdeae5] rounded-full flex items-center justify-center hover:bg-[#fbd9d1] transition-colors z-10"
          >
            <ChevronRight size={22} className="text-[#f45b4e]" />
          </button>
        </div>
      </div>
    </section>
  )
}
