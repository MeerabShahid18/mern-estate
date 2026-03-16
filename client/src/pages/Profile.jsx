import { useSelector , useDispatch} from "react-redux"
import { useRef , useState, useEffect} from "react"
import { supabase } from "../supabase"
import {deleteUserFailure, deleteUserStart, deleteUserSuccess, logoutUserFailure, logoutUserStart, logoutUserSuccess, setUser} from "../redux/user/userSlice"

export default function Profile() {
  const {currentUser, loading, error}=useSelector((state)=>state.user)
   const dispatch = useDispatch();
   
  const fileRef=useRef(null);
  const [file, setFile]=useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});
    

  console.log(file);

  // Form state
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [password, setPassword] = useState("");
  console.log("Current user is : ",currentUser) 
 
  // Pre-fill form when currentUser loads
  useEffect(() => {
    if (currentUser) {
      setUsername(currentUser.username || "");
      setEmail(currentUser.email || "");
      setAvatarUrl(currentUser.avatar || "");
    }
  }, [currentUser]);

 

  const handleFileUpload=async(file)=>{
    //FILE UPLOAD TASK
       setFilePerc(5);
       setFilePerc(20);
       setFilePerc(40);
       setFilePerc(50);
      const fileName = `${Date.now()}-${file.name}`;
       const { data, error } = await supabase.storage
        .from('avatars')
        .upload(fileName, file);
      
      if (error) {
        setFileUploadError(true);
        console.log('Upload error:', error);
        return;
      }
      const { data: publicUrlData } = supabase.storage
        .from('avatars')
        .getPublicUrl(fileName);

      const imageUrl = publicUrlData?.publicUrl;
      if (!imageUrl) {
        setFileUploadError(true);
        return;
      }

      setFilePerc(100);
      setAvatarUrl(imageUrl);
      console.log(imageUrl);

    
};



   const handleUpdate = async (e) => {
  e.preventDefault();

  try {
    const res = await fetch(`/api/user/update/${currentUser._id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        email,
        avatar: avatarUrl,
        password, 
      }),
    });
   

    
    const data = await res.json();
    if (!res.ok) {
      alert(data.message);
      return;
    }

    

    dispatch(setUser(data));
    alert("Profile updated successfully!");
  } catch (error) {
    console.log(error);
  }
  
};

const handleDeleteUser= async()=>{
  try {
    dispatch(deleteUserStart());
    const res=await fetch(`/api/user/delete/${currentUser._id}`,{
      method:'DELETE',
    })
    const data =await res.json();
    if(data.success===false){
      dispatch(deleteUserSuccess(data));
    }
    
  } catch (error) {
    dispatch(deleteUserFailure(error.message))
    
  }
}

const handlesignout=async()=>{
  try {
    dispatch(logoutUserStart());
    const res=await(fetch('/api/auth/signout'));
    const data=await res.json();
    if(data.success===false){
      dispatch(logoutUserFailure(data.message));
      return;
    }
    dispatch(logoutUserSuccess(data));
  } catch (error) {
    dispatch(logoutUserFailure(data.message));
    
  }
}

  return (
    <div className="max-w-lg p-3 mx-auto">
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className="flex flex-col gap-4" onSubmit={handleUpdate}>
       <input
          type="file"
          accept="image/*"
          ref={fileRef}
          hidden
          onChange={async (e) => {
          const selectedFile = e.target.files[0];
          if (selectedFile) {
            setFile(selectedFile);
            await handleFileUpload(selectedFile); // upload immediately
          }
          }}
       />

        <img
            onClick={() => fileRef.current.click()}
            src={avatarUrl || currentUser?.avatar || "https://cdn.pixabay.com/photo/2023/02/18/11/00/icon-7797704_640.png"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mt-2 border"
        />

        <p className="text-sm self-center">
          {fileUploadError ? (
            <span className="text-red-700">
              Error uploading image (must be image & less than 2MB)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className="text-slate-700">{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className="text-green-700">Image successfully uploaded!</span>
          ) : (
            ""
          )}
        </p>

        <input type="text" placeholder="username" value={username} id="username" className="border p-3 rounded-lg" onChange={(e) => setUsername(e.target.value)}/>
        <input type="email" placeholder="email" id="email" value={email} className="border p-3 rounded-lg" onChange={(e) => setEmail(e.target.value)} />
        <input type="password" placeholder="password" id='password' className="border p-3 rounded-lg" onChange={(e) => setPassword(e.target.value)}/>
        <button disabled={loading} type="submit" className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-90">{loading?"Loading...":"Update"}</button>
      </form>
      <div className="flex justify-between mt-3">
        <span onClick={handleDeleteUser} className="text-red-700 cursor-pointer">Delete Account</span>
        <span onClick={handlesignout} className="text-red-700 cursor-pointer">Sign out</span>
      </div>
    </div>
  )
} 

