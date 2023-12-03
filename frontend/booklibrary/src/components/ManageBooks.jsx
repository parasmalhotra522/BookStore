import { EnvelopeIcon, PencilIcon, PhoneIcon, TrashIcon } from '@heroicons/react/20/solid'
import { Link } from 'react-router-dom'

const products = [
    {
      id: 1,
      name: 'The Laws of contracts',
      author: 'S.M WADDAMS',
      description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
      href: '#',
      bookQuntity: 20,
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
      imageAlt: 'The laws of contract',
      price: '65',
    },
    {
      id: 2,
      name: 'The Laws of contracts',
      author: 'S.M WADDAMS',
      description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
      href: '#',
      bookQuntity: 20,
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
      imageAlt: 'The laws of contract',
      price: '65',
    },
    {
      id: 3,
      name: 'The Laws of contracts',
      author: 'S.M WADDAMS',
      description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
      href: '#',
      bookQuntity: 20,
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
      imageAlt: 'The laws of contract',
      price: '65',
    },
    {
      id: 4,
      name: 'The Laws of contracts',
      author: 'S.M WADDAMS',
      description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
      href: '#',
      bookQuntity: 20,
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
      imageAlt: 'The laws of contract',
      price: '65',
    },
    {
      id: 4,
      name: 'The Laws of contracts',
      author: 'S.M WADDAMS',
      description: "essential element of Canadian contract law and is frequently cited by Canadian courts at all levels",
      href: '#',
      bookQuntity: 20,
      imageSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTrjLOPhyvX0H54YvDc5nQ57UI6UjfrKVDzg&usqp=CAU',
      imageAlt: 'The laws of contract',
      price: '65',
    },
    // More products...
  ]

export default function ManageBooks() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 lg:pb-24">
    <h2 className="px-4 sm:px-6 sm:py-10 text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
    Manage Books
    </h2>
    <ul role="list" className="px-4 sm:px-6 sm:py-10 grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:px-8">
      {products.map((product) => (
        <li
          key={product.id}
          className="col-span-1 flex flex-col divide-y divide-gray-200 rounded-lg bg-white text-center shadow"
        >
          <div className="flex flex-1 flex-col p-8">
            <img className="mx-auto h-32 w-32 flex-shrink-0 rounded-full" src={product.imageSrc} alt="" />
            <h3 className="mt-6 text-sm font-medium text-gray-900">{product.name}</h3>
            <dl className="mt-1 flex flex-grow flex-col justify-between">
              <dt className="sr-only">Author</dt>
              <dd className="text-sm text-gray-500">By {product.author}</dd>
              <dd className="text-sm text-gray-500">$ {product.price}</dd>
              <dt className="sr-only">Availblity</dt>
              <dd className="mt-3">
                <span className="inline-flex items-center rounded-full bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                 In Stock: {product.bookQuntity}
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <div className="-mt-px flex divide-x divide-gray-200">
              <div className="flex w-0 flex-1">
                <Link
                  to="/"
                  className="relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <PencilIcon className="h-5 w-5 text-gray-400 " aria-hidden="true" />
                  Update
                </Link>
              </div>
              <div className="-ml-px flex w-0 flex-1">
                <Link
                  to="/"
                  className="relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900 hover:bg-gray-100"
                >
                  <TrashIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                  Remove
                </Link>
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
    </div>
  )
}
