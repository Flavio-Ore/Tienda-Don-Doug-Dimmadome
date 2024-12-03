import useAuth from '@/states/auth/hooks/useAuth'
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
} from '@shadcn/alert-dialog'
import { ImExit } from 'react-icons/im'
import { useNavigate } from 'react-router-dom'

const LogoutDialog = () => {
  const { logout } = useAuth()
  const nagivate = useNavigate()

  const handleLogout = () => {
    logout()
    nagivate('/')
  }
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className='flex gap-x-2 justify-start items-center p-4 cursor-pointer focus-visible:border-light-1'>
          <ImExit
            size={24}
            className='fill-red-500 group-hover:stroke-red-500'
          />
          <span className='relative lg:text-sm md:text-xs md:inline hidden'>
            Cerrar Sesión
          </span>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Cerrar Sesión</AlertDialogTitle>
          <AlertDialogDescription>
            ¿Estás seguro que deseas cerrar sesión?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction onClick={handleLogout}>
            <div className='flex-center gap-x-2'>
              <span className='focus-visible:text-light-1'>Cerrar Sesión</span>
              <ImExit
                size={16}
                className='fill-red-600 group-hover:stroke-red-700 focus-visible:stroke-red-800'
              />
            </div>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default LogoutDialog
