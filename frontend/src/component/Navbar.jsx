import { useAuthStore } from '../store/useAuthStore'

const Navbar=()=>{
  const {logout} =useAuthStore()
  return <div>
    <button onClick={logout} className="btn btn-warning">Logout</button>

  </div>
}

export default Navbar