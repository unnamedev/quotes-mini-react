import React, {useEffect, useState} from "react"
import {FaRandom} from "react-icons/fa"
import styled from "styled-components"

// 🪜 Styles
import {GlobalStyles} from "./globalStyles"

// 🪜 Component - App
const App = () => {
    const [quote, setQuote] = useState("")
    const [background, setBackground] = useState("#cfffaf")

    /**
     * Fetch quote data
     * @returns {Promise<void>}
     */
    const fetchData = async () => {
        const response = await fetch("https://api.quotable.io/random?tags=famous-quotes")
        setQuote(await response.json())
        setBackground(`hsla(${Math.random() * 360}, 100%, 90%)`)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return <>
        <GlobalStyles/>
        <Wrapper background={background}>
            <Inner>
                {Object.entries(quote).length !== 0 ? (
                    <>
                        <Title>{quote.content}</Title>
                        <p>&#8213; {quote.author}</p>
                        <FaRandom size={30} onClick={fetchData}/>
                    </>
                ) : <h1>Loading...</h1>}
            </Inner>
        </Wrapper>
    </>
}

export default App

// 🪜 Component
const Wrapper = styled.div`
  display: grid;
  grid-template-columns: auto minmax(100px, 800px) auto;
  min-height: 100vh;
  font-size: 24px;
  background-color: ${({background}) => background ? background : "#cfffaf"};
  background-image: linear-gradient(180deg, #fff, rgba(255, 255, 255, 0));
  justify-content: center;
  align-items: center;
  font-family: var(--base-font-family);
  color: var(--primary-text-color);
  transition: background-color 0.25s ease;
  padding-left: 10px;
  padding-right: 10px;
`

const Inner = styled.div`
  grid-column: 2/3;
  min-height: inherit;
  display: flex;
  flex-direction: column;
  justify-content: center;

  @keyframes animateInner {
    from {
      opacity: 0;
      transform: translateY(100px);
    }
    to {
      opacity: 1;
      transform: translateY(0px);
    }
  }

  h1 {
    font-size: calc(35px + (65 - 35) * ((100vw - 300px) / (1920 - 300)));
    line-height: 1.2;
  }

  p {
    font-size: calc(18px + (40 - 18) * ((100vw - 300px) / (1920 - 300)));
    line-height: 1.2;
    animation: animateInner 1s;
  }

  svg {
    cursor: pointer;
    display: block;
    margin: auto auto 30px;
  }
`

const Title = styled.h1`
  margin-bottom: 20px;
  font-size: calc(35px + (65 - 35) * ((100vw - 300px) / (1920 - 300)));
  line-height: 1.2;
  margin-top: auto;
  position: relative;
  animation: animateInner 1s;

  &::after,
  &::before {
    content: "\\201C";
    font-size: calc(35px + (65 - 35) * ((100vw - 300px) / (1920 - 300)));
  }

  &::after {
    content: "\\201D";
  }
`