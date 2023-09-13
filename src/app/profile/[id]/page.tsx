

const UserProfile = ({params}: any) => {
  return (
    <div className='h-screen flex flex-col gap-3 items-center justify-center'>
      <h1 className="text-xl">User profile page</h1>
      <p className="text-3xl flex items-center gap-2">
        Welcome user: 
        <span>{params.id}</span>
      </p>
    </div>
  )
}

export default UserProfile
