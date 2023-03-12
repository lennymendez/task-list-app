import Default from '@/utils/default'

const Landing = ({ onClick, providers }) => (
  <>
    <h2 className='mb-16 mt-16 w-full md:w-1/2 text-5xl md:text-7xl font-mf-bold'>
      {Default.title}
    </h2>
    {/* LOG IN */}
    {Object.values(providers).map((provider, index) => (
        <div key={index}>
          <button
              type='button'
              className='w-60 h-auto py-3 px-5 text-lg md:w-96 md:text-2xl cursor-pointer text-white bg-black rounded-sm'
              onClick={() => onClick(provider)}
          >
              {Default.sign_in}
          </button>
        </div>
    ))}
  </>
)

Landing.displayName = 'Landing'

export default Landing