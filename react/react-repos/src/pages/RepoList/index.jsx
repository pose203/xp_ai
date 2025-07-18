import { 
  useParams,
  useNavigate,
  Link
} from 'react-router-dom'
import { useEffect } from 'react'
import { useRepos } from '@/hooks/useRepos';
import Loading from '../../components/Loading';


const RepoList = () => {

  const {id} = useParams();
  console.log(useParams());
  const navigate = useNavigate();
  // hooks
  const {repos,loading,error} = useRepos(id);
  console.log(repos,loading,error)
  useEffect(()=>{
  if(!id.trim()){
    navigate('/')
  }
  
},[])
if(loading) return <Loading/>;
if(error) return <div>{error.message}</div>

    
    return (
        <>
          <h2>RepoList for {id}</h2>
          <ul>
            {repos.map((repo)=>(
              <Link key={repo.id} to={`/users/${id}/repos/${repo.id}`}>{repo.name}</Link>
            ))}
          </ul>
        </>
    )
}

export default RepoList