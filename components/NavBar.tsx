'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { signOut } from 'next-auth/react';
import Link from 'next/link';
import { Button } from '~/components/ui/button';
import { Logo, PokePalText } from '~/components/ui/icons';

export const NavBar = () => {
  return (
    <>
      <div className='flex justify-between align-middle mr-8 mt-7'>
        <a href='/dashboard' className='pl-7 flex'>
          <Logo className='h-11 cursor-pointer' />
          <PokePalText className='h-5 ml-3.5 self-center' />
        </a>

        <span className='flex pt-2'>
          <NavigationMenu className='relative r-0'>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Social</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='w-[200px] gap-3 p-3'>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href='/friends'
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm'
                        >
                          Friends
                        </a>
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href='/messages'
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm'
                        >
                          Messages
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Pokemon</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className='w-[200px] gap-3 p-3'>
                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href='/pokemon'
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm'
                        >
                          Party
                        </a>
                      </NavigationMenuLink>
                    </li>

                    <li>
                      <NavigationMenuLink asChild>
                        <a
                          href='/pokemon/storage'
                          className='block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground text-sm'
                        >
                          Storage
                        </a>
                      </NavigationMenuLink>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link href='/settings' legacyBehavior passHref>
                  <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                    Settings
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <Button
            variant='link'
            className='text-neutral-600'
            onClick={() => signOut({ callbackUrl: '/login' })}
          >
            Log out
          </Button>
        </span>
      </div>
    </>
  );
};
