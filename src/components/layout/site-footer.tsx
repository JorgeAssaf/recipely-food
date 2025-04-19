/* eslint-disable deprecation/deprecation */
import Link from 'next/link'
import { Github, Pizza } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { cn } from '@/lib/utils'

import { Shell } from '../shell'
import { buttonVariants } from '../ui/button'

const SiteFooter = () => {
  return (
    <footer className='bg-background w-full border-t'>
      <Shell>
        <section
          id='footer-content'
          aria-labelledby='footer-content-heading'
          className='flex flex-col gap-10 lg:flex-row lg:gap-20'
        >
          <section
            id='footer-branding'
            aria-labelledby='footer-branding-heading'
          >
            <Link href='/' className='flex w-fit items-center space-x-2'>
              <Pizza className='size-6' aria-hidden='true' />
              <span className='font-bold'>{siteConfig.name}</span>
              <span className='sr-only'>Home</span>
            </Link>
          </section>
          <section
            id='footer-links'
            aria-labelledby='footer-links-heading'
            className='xxs:grid-cols-2 grid flex-1 grid-cols-1 gap-5 sm:grid-cols-3'
          >
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className='space-y-3'>
                <p className='text-base font-medium'>{item.title}</p>
                <ul className='space-y-3'>
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? '_blank' : undefined}
                        rel={link?.external ? 'noreferrer' : undefined}
                        className='text-muted-foreground hover:text-foreground text-sm transition-colors'
                      >
                        {link.title}
                        <span className='sr-only'>{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section
            id='newsletter'
            aria-labelledby='newsletter-heading'
            className='space-y-3'
          >
            <p className='text-base font-medium'>
              Subscribe to our newsletter (Coming Soon)
            </p>
          </section>
        </section>
        <section
          id='footer-bottom'
          aria-labelledby='footer-bottom-heading'
          className='flex items-center space-x-4'
        >
          <div className='text-muted-foreground flex-1 text-left text-sm leading-loose'>
            Built by{' '}
            <Link
              href='https://jorgeassaf.vercel.app/'
              target='_blank'
              rel='noreferrer'
              className='hover:text-foreground font-semibold transition-colors'
            >
              Jorge Assaf
              <span className='sr-only'>Twitter</span>
            </Link>
            .
          </div>
          <div className='flex items-center space-x-1'>
            <Link
              href={siteConfig.sourceCode}
              target='_blank'
              rel='noreferrer'
              className={cn(
                buttonVariants({
                  size: 'icon',
                  variant: 'ghost',
                }),
              )}
            >
              <Github className='size-4' aria-hidden='true' />
              <span className='sr-only'>GitHub</span>
            </Link>
          </div>
        </section>
      </Shell>
    </footer>
  )
}
export default SiteFooter
