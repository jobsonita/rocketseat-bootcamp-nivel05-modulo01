import styled from 'styled-components'

export const Calendar = styled.aside`
  width: 380px;
`

export const Container = styled.div``

export const Content = styled.main`
  max-width: 1120px;
  margin: 64px auto;

  display: flex;
`

export const Header = styled.header`
  padding: 32px 0;
  background: #28262e;
`

export const HeaderContent = styled.div`
  max-width: 1120px;
  margin: 0 auto;

  display: flex;
  align-items: center;

  > img {
    height: 80px;
  }

  button {
    margin-left: auto;
    background: transparent;
    border: 0;
  }

  svg {
    color: #999591;
    height: 20px;
    width: 20px;
  }
`

export const NextAppointment = styled.div`
  margin-top: 64px;

  > strong {
    color: #999591;
    font-size: 20px;
  }

  div {
    position: relative;

    background: #3e3b47;
    padding: 16px 24px;
    border-radius: 10px;
    margin-top: 24px;

    display: flex;
    align-items: center;

    &::before {
      content: '';

      position: absolute;

      height: 80%;
      width: 1px;
      left: 0;
      top: 10%;
      background: #ff9000;
    }

    img {
      width: 80px;
      height: 80px;
      border-radius: 50%;
    }

    strong {
      margin-left: 24px;
      color: #fff;
    }

    span {
      margin-left: auto;
      color: #999591;

      display: flex;
      align-items: center;

      svg {
        color: #ff9000;
        margin-right: 8px;
      }
    }
  }
`

export const Profile = styled.div`
  margin-left: 80px;

  display: flex;
  align-items: center;

  img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  div {
    margin-left: 16px;
    line-height: 24px;

    display: flex;
    flex-direction: column;
  }

  span {
    color: #f4ede8;
  }

  strong {
    color: #ff9000;
  }
`

export const Schedule = styled.div`
  flex: 1;
  margin-right: 120px;

  h1 {
    font-size: 36px;
  }

  p {
    margin-top: 8px;
    color: #ff9000;

    display: flex;
    align-items: center;

    font-weight: 500;

    span {
      display: flex;
      align-items: center;
    }

    span + span::before {
      content: '';

      width: 1px;
      height: 16px;
      background: #ff9000;
      margin: 0 8px;
    }
  }
`
