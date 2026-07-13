import { Star, ChevronLeft, ChevronRight } from 'lucide-react'

const reviews = [
  {
    name: "Emily Thun",
    initials: "ET",
    rating: 5,
    time: "a month ago",
    text: "I took the LLQP online courses and they were really helpful. Responsive customer support and lots of resources for studying."
  },
  {
    name: "Amit Gogia",
    initials: "AG",
    rating: 5,
    time: "2 months ago",
    text: "Nice team to help and courses to persue your career, Andy replied to my queries swiftly which helped me make a decision on the spot, I purchased the course and already started, Thank You Vipin"
  },
  {
    name: "Shaopeng Woo",
    initials: "SW",
    rating: 5,
    time: "3 months ago",
    text: "Appreciate your prompt support"
  }
]

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={16}
          className={star <= rating ? "fill-[#f59e0b] text-[#f59e0b]" : "text-gray-300"}
        />
      ))}
    </div>
  )
}

export default function Testimonials() {
  return (
    <section className="bg-[#f5f8fd] py-16 px-8">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-12">
          Vipin Garg is trusted by professionals across Canada
        </h2>
        
        <div className="relative">
          <button className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
            <ChevronLeft size={24} className="text-gray-600" />
          </button>
          
          <div className="grid grid-cols-3 gap-6 px-8">
            {reviews.map((review, index) => (
              <div key={index} className="bg-white rounded-lg p-6 shadow-sm">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center text-white font-medium">
                    {review.initials}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{review.name}</h4>
                    <StarRating rating={review.rating} />
                  </div>
                </div>
                <p className="text-gray-500 text-sm mb-3">{review.time}</p>
                <p className="text-gray-700">{review.text}</p>
              </div>
            ))}
          </div>
          
          <button className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-gray-50 transition-colors z-10">
            <ChevronRight size={24} className="text-gray-600" />
          </button>
        </div>
      </div>
    </section>
  )
}

