
const SiteFooter = () => {
  return (
    <footer className=' w-full border-t bg-background'>
      <div className='container flex h-16 items-center'>
        <div className='flex flex-col items-center justify-center gap-4  text-center md:flex-row md:justify-between '>
          <div className='flex flex-col items-center gap-4 md:flex-row md:gap-8'>
            <a
              href='#'
              className='flex items-center gap-2 text-2xl font-bold tracking-tight '
            >
              <span className='sr-only'>Recipe</span>
              <span className='text-3xl font-bold tracking-tight '>
                Recipe
              </span>
            </a>
            <div className='flex items-center gap-6 text-gray-500'>
              <a href='#' className='hover:'>
                <span className='sr-only'>About</span>
                <svg
                  className='h-6 w-6'
                  aria-hidden='true'
                  fill='currentColor'
                  viewBox='0 0 24 24'
                >
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM12 4C16.411 4 20 7.589 20 12C20 16.411 16.411 20 12 20C7.589 20 4 16.411 4 12C4 7.589 7.589 4 12 4Z'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12 6C11.447 6 11 6.447 11 7V11C11 11.553 11.447 12 12 12C12.553 12 13 11.553 13 11V7C13 6.447 12.553 6 12 6Z'
                  />
                  <path
                    fillRule='evenodd'
                    clipRule='evenodd'
                    d='M12 14C11.447 14 11 14.447 11 15C11 15.553 11.447 16 12 16C12.553 16 13 15.553 13 15C13 14.447 12.553 14 12 14Z'
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
export default SiteFooter
