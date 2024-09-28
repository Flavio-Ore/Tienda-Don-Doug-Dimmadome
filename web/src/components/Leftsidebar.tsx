import { Button } from '@shadcn/button'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from './ui/alert-dialog'

const Leftsidebar = () => {
  const navigation = useNavigate()
  const handleLogout = async () => {
    navigation('/')
  }
  return (
    <nav className='leftsidebar min-w-20 xl:min-w-56 '>
      <div className='flex flex-col gap-8'>
        <Link to='/' className='gap-3 items-center hidden xl:flex'>
          <img
            className='block'
            src='/Stock_Image_of_Doug_Dimmadome_logo.png'
          />
        </Link>
        <ul className='flex flex-col gap-2'>
          <li
            className='leftsidebar-link relative group base-regular 
                bg-dark-4 before:block before:bg-primary-500 before:absolute before:-inset-0.5 before:-left-16 before:w-[50px] before:rounded-full'
          >
            <NavLink
              to={'/inventario'}
              className='flex gap-4 justify-center xl:justify-start items-center py-4 xl:p-4'
            >
              <span className='relative hidden xl:inline'>Nuevo producto</span>
            </NavLink>
          </li>
        </ul>
      </div>
      <div className='flex flex-col gap-2 mt-12'>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button
              variant='ghost'
              className='flex-start gap-x-3 hover:bg-red-700'
            >
              <LucideLogOut
                size={24}
                className='stroke-red-700 group-hover:stroke-white'
              />
              <span className='hidden xl:inline group-hover:text-light-2 small-regular'>
                Logout
              </span>
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Logout</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to logout?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={handleLogout}>
                <div className='flex-center gap-x-2'>
                  <span className='text-red-500 group-hover:text-primary-500'>
                    Logout
                  </span>
                  <LucideLogOut
                    size={24}
                    className='stroke-red-500 group-hover:stroke-secondary-500'
                  />
                </div>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <Button
          variant='ghost'
          className='flex gap-x-3 w-full justify-center xl:justify-start items-center p-0 xl:px-4 hover:bg-primary-600'
        >
          <SettingsIcon
            size={24}
            strokeWidth={1.1}
            className='stroke-primary-500 group-hover:stroke-secondary-500'
          />
          <span className='hidden xl:inline group-hover:text-secondary-500 small-regular'>
            Settings
          </span>
        </Button>
      </div>
    </nav>
  )
}

export default Leftsidebar
