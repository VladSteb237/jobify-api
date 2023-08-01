import React from 'react';
import { Logo } from '../components';
import { Link, Navigate } from 'react-router-dom';
import main from '../assets/images/main.svg';
import Wrapper from '../assets/wrappers/LandingPage';
import { useAppContext } from '../context/appContext';

const Landing = () => {
    const { user } = useAppContext();
    return (
        <React.Fragment>
            {user && <Navigate to='/' />}
            <Wrapper>
                <nav>
                    <Logo />
                </nav>
                <div className='container page' >
                    {/* info */}
                    <div className='info'>
                        <h1>
                            Работа <span> Блокнот </span> app
                        </h1>
                        <p>
                            I'm baby helvetica 90's kombucha try-hard.
                            Hell of post-ironic woke ethical deep v.
                            Hashtag cray banjo sriracha kombucha same
                            vegan fit listicle scenester echo park roof party mustache.
                        </p>
                        <Link to='/register' className='btn btn-hero'>
                            Login/Register
                        </Link>
                    </div>
                    {/* image */}
                    <img src={main} alt="job hunt" className='img main-img' />
                </div>
            </Wrapper>
        </React.Fragment>
    );
};

// const Wrapper = styled.main`
//     nav {
//         width: var(--fluid-width);
//         max-width: var(--max-width);
//         margin: 0 auto;
//         height: var(--nav-height);
//         display: flex;
//         align-items: center;
//     }
//     .page {
//         min-height: calc(100vh - var(--nav-height));
//         display: grid;
//         align-items: center;
//         margin-top: -3rem;
//     }
//     h1 {
//         font-weight: 700;
//         span{
//             color: var(--primary-500);
//         }
//     }
//     p{
//         color: var(--grey-600)
//     }
//     .main-img{
//         display: none;
//     }
//     @media (min-width: 992px){
//         .page{
//             grid-template-columns:1fr 1fr;
//             column-gap:3rem;
//         }
//         .main-img{
//             display: block;
//         }
//     }
// `;

export default Landing;
