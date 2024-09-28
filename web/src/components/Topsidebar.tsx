import { Link } from 'react-router-dom'

const Topsidebar = () => {
  return (
    <header className='min-w-full'>
      <nav className='bg-dark-1'>
        <Link to='/'>Login</Link>
      </nav>
    </header>
  )
}

export default Topsidebar
