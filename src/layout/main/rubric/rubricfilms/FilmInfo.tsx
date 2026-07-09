
import { useState, useEffect } from 'react'
import type * as Types from './../../../../components/types/types'
import instance, { IMG_BASE_URL } from './../../../../components/instance/instance'




export const FilmInfo = () => {
  const [film, setFilm] = useState<Types.BaseFilmResponse | null>(null)
  const [cast] = useState<Types.Cast[] | null>(null)
  const [similar, setSimilar] = useState<Types.BaseFilmResponse[] | null>(null)
  const [error, setError] = useState<Types.Error | null>(null)


  useEffect(() => {
    const fetchCastCredits = async () => {
      try {
        const response = await instance.get('/278')
        setFilm(response.data)
      } catch (error) {
        console.error('Детали ошибки:', error)
        const message = error instanceof Error ? error.message : 'Unknown error'
        setError({
          code: 'unknown',
          message,
          name: false,
        })
      } finally {
      }
    }
    fetchCastCredits()
  }, [])




  useEffect(() => {
    const fetchFilm = async () => {
      try {
        const response = await instance.get('/278/credits')
        setSimilar(response.data)
        console.log(response.data)
      } catch (error) {
        console.error('Детали ошибки:', error)
        // setError(error)
      } finally {
      }
    }
    fetchFilm()
  }, [])

  console.log(cast, similar)

  const posterSrc = film?.poster_path
    ? `${IMG_BASE_URL}/w500${film.poster_path}`
    : '/no-poster.svg'



  if (error) return (<div>
    <div>Ошибка: {error.code}</div>
    <div>Ошибка: {error.message}</div>
    <div>Ошибка: {error.name}</div>
  </div>)

  return (
    <>
      <div className=' container aboutfilm'>
        {/* Секция фильма */}
        <div className="content">
          <div className='poster'>
            <img
              src={posterSrc}
              alt="Постер к фильму"
              onError={(event) => {
                event.currentTarget.src = '/no-poster.svg'
              }}
            />
          </div>
          <div className='details'>
            <div className='details_header '>
              <div className='details_top'>
                <h1 className='details_title'>Название фильма</h1>
                <button className='details_button'>Back</button>
              </div>
              <div className='details_meta'>
                <span>Release year: 2026</span>
                <span>6.8</span>
                <span>Runtime: 1h 47m</span>
              </div>
            </div>
            {/* Описание */}
            <p className="text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Eaque praesentium sunt quas, facilis placeat ullam harum vitae nihil obcaecati, rerum dolores fugiat culpa tempore reprehenderit iusto, consequuntur quos adipisci ratione?</p>
          </div>
          <div className="details_section">
            <h2 className="title">Genres</h2>
            <ul className="list">
              <li className="item">Action</li>
              <li className="item">Crime</li>
              <li className="item">Thriller</li>
            </ul>
          </div>
        </div>
        <div className="section">
          <div className="header">
            <h2>Cast</h2>
          </div>
          <div className="grid">
            <article className="card" key="cast-card-1">
              <div className="avatarFrame">
                <img src="" alt="" className="avatar" />
              </div>
              <div className="info">
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </article>
            <article className="card">
              <div className="avatarFrame">
                <img src="" alt="" className="avatar" />
              </div>
              <div className="info">
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </article>
            <article className="card">
              <div className="avatarFrame">
                <img src="" alt="" className="avatar" />
              </div>
              <div className="info">
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </article>
            <article className="card">
              <div className="avatarFrame">
                <img src="" alt="" className="avatar" />
              </div>
              <div className="info">
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </article>
            <article className="card">
              <div className="avatarFrame">
                <img src="" alt="" className="avatar" />
              </div>
              <div className="info">
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </article>
            <article className="card">
              <div className="avatarFrame">
                <img src="" alt="" className="avatar" />
              </div>
              <div className="info">
                <p>Lorem, ipsum dolor.</p>
                <p>Lorem, ipsum dolor.</p>
              </div>
            </article>
          </div>
        </div>
        <section className="section">
          <div className="header">
            <h2 className="title">Similar Movies</h2>
          </div>
          <div className="grid">
            <article className="card">
              <div className="pesterFrame">
                <a href="" className="posterLink">
                  <img src="" alt="" className="poster" />
                  <span className="badge"></span>
                </a>
                <button className="button">
                </button>
              </div>
              <a href="" className="cardTitleLink">
                <h3 className="cardTitle"></h3>
              </a>
            </article>
            <article className="card">
              <div className="pesterFrame">
                <a href="" className="posterLink">
                  <img src="" alt="" className="poster" />
                  <span className="badge"></span>
                </a>
                <button className="button">
                </button>
              </div>
              <a href="" className="cardTitleLink">
                <h3 className="cardTitle"></h3>
              </a>
            </article>
            <article className="card">
              <div className="pesterFrame">
                <a href="" className="posterLink">
                  <img src="" alt="" className="poster" />
                  <span className="badge"></span>
                </a>
                <button className="button">
                </button>
              </div>
              <a href="" className="cardTitleLink">
                <h3 className="cardTitle"></h3>
              </a>
            </article>
            <article className="card">
              <div className="pesterFrame">
                <a href="" className="posterLink">
                  <img src="" alt="" className="poster" />
                  <span className="badge"></span>
                </a>
                <button className="button">
                </button>
              </div>
              <a href="" className="cardTitleLink">
                <h3 className="cardTitle"></h3>
              </a>
            </article>
            <article className="card">
              <div className="pesterFrame">
                <a href="" className="posterLink">
                  <img src="" alt="" className="poster" />
                  <span className="badge"></span>
                </a>
                <button className="button">
                </button>
              </div>
              <a href="" className="cardTitleLink">
                <h3 className="cardTitle"></h3>
              </a>
            </article>
            <article className="card">
              <div className="pesterFrame">
                <a href="" className="posterLink">
                  <img src="" alt="" className="poster" />
                  <span className="badge"></span>
                </a>
                <button className="button">
                </button>
              </div>
              <a href="" className="cardTitleLink">
                <h3 className="cardTitle"></h3>
              </a>
            </article>
          </div>
        </section>
      </div>


    </>
  )
}