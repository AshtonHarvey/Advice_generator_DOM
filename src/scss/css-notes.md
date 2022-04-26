.debug--border{
  border: 2px solid red;
}

.container{
}

.container+.container{
  margin-top: 0;
}

.background--blue{
  background-color: rgb(77, 77, 240);
}

.hero{
  display: flex;
  justify-content: space-between;

  .hero__container{
    width: 25%;
    margin: 5% auto;
    box-sizing: border-box;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    line-height: 6rem;
    color: white;

    .hero__image{
      width: 100%;
      object-fit: cover;
    }

    .hero__title{
        font-weight: bold;
        font-size: 5rem;     
    }

    .hero__text{
      font-size: 2rem;
    }
  }


}


