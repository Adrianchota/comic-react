import { useLocation, useNavigate } from "react-router-dom";
import querysString from 'query-string'
import { useForm } from "../../hooks/useForm"
import { HeroCard } from "../components/HeroCard"
import { getHeroesByName } from "../helpers";

export const Search = () => {

  const navigate = useNavigate();
  const location = useLocation();
  const {q=''} = querysString.parse(location.search);
  const heroes = getHeroesByName(q);

  const {searchText, onInputChange}= useForm({
    searchText: q
  });

  const onSearchSumbit= (e)=>{
    e.preventDefault();
    if(searchText.trim().length <1) return;
    
    navigate(`?q=${searchText}`)
  }
  return (
    <>
    <h1>Search</h1>
    <hr />

    <div className="row">

      <div className="col-5">
          <h4>Searching</h4>
          <hr />

          <form onSubmit={onSearchSumbit}>

              <input 
              type="text"
              placeholder="Search a Hero"
              className="form-control"
              name="searchText"
              autoComplete="off"
              value={searchText}
              onChange={onInputChange}
              />

              <button
              className="btn btn-outline-primary mt-1">
                Search
              </button>

          </form>
      </div>

      <div className="col-7">

          <h4>Results</h4>
          <hr />
          {
            (q === '')
            ?
            <div className="alert alert-primary">
            Search a hero
            </div>
            : (heroes.length === 0) &&
            <div className="alert alert-danger">
            <b>There's no results with {q}</b>
            </div>
          }


          {
            heroes.map(hero =>(
              <HeroCard key={hero.id}{...hero}/>
            ))
          }
          
      </div>

    </div>

    </>
  )
}
