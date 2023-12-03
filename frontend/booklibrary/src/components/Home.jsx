const products = [
  {
    id: 1,
    name: 'The Laws of contracts',
    author: 'S.M WADDAMS',
    description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
    href: '#',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
    imageAlt: 'The laws of contract',
    price: '$65',
  },
  {
    id: 2,
    name: 'The Laws of contracts',
    author: 'S.M WADDAMS',
    description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
    href: '#',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
    imageAlt: 'The laws of contract',
    price: '$65',
  },
  {
    id: 3,
    name: 'The Laws of contracts',
    author: 'S.M WADDAMS',
    description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
    href: '#',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
    imageAlt: 'The laws of contract',
    price: '$65',
  },
  {
    id: 4,
    name: 'The Laws of contracts',
    author: 'S.M WADDAMS',
    description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
    href: '#',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
    imageAlt: 'The laws of contract',
    price: '$65',
  },
  {
    id: 4,
    name: 'The Laws of contracts',
    author: 'S.M WADDAMS',
    description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
    href: '#',
    imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
    imageAlt: 'The laws of contract',
    price: '$65',
  },
  // More products...
]

export default function Home() {
  return (
    <div>
      <div className="mx-auto max-w-2xl px-4 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8 ">
        <h2 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">Book Lists</h2>

        <div className="mt-8 grid grid-cols-1 gap-y-12 sm:grid-cols-2 sm:gap-x-4 lg:grid-cols-4 xl:gap-x-6">
          {products.map((product) => (
            <div key={product.id} className="border rounded-md border-gray-300 px-1 py-2">
              <div className="relative">
                <div className="relative h-72 w-full overflow-hidden rounded-lg">
                  <img
                    src={product.imageSrc}
                    alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>
                <div className="relative mt-4 px-1">
                  <h3 className="text-md font-medium text-gray-900">{product.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">By {product.author}</p>
                  <span className="mt-1 text-xs text-gray-400">{product.description}</span>
                </div>
                <div className="absolute inset-x-0 top-0 flex h-72 items-end justify-end overflow-hidden rounded-lg p-4">
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-36 bg-gradient-to-t from-black opacity-50"
                  />
                  <p className="relative text-lg font-semibold text-white">{product.price}</p>
                </div>
              </div>
              <div className="mt-6">
                <a
                  href={product.href}
                  className="relative flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-2 text-sm text-white font-bold hover:bg-indigo-500"
                >
                  Add to bag<span className="sr-only">, {product.name}</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
