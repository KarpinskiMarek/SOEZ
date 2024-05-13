import react from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import {MdDelete} from "react-icons/md";
import {Link} from "react-router-dom";
import React from "react";

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 50%;
`;

const SearchForm = styled.form`
   display: flex;
   justify-content: space-between;
   align-items: center;
   margin-bottom: 2rem;
`;

const SearchInput = styled.input`
    margin: 1rem;
    font-size: 1rem;
    border-radius: 12px;
    border: solid 1px black;
    padding: 12px;
    
`;

const SearchButton = styled.button`
    background-color: rgba(202, 240, 248, 1);
    padding: 12px;
    border: solid 1px black;
    border-radius: 12px;

    &:hover {
    background-color: rgba(72, 202, 228, 1);
    }
`;

const ResultSet = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: center;
    border-radius: 5px;
    border: solid 2px black;
    padding: 2rem;
    width: 100%;
`;

const ResultRow = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    border: solid 2px black;
    border-radius: 5px;
    margin: 1rem;
    padding: 0.5rem;
    background-color: rgba(202, 240, 248, 1);

    &:hover {
    background-color: rgba(72, 202, 228, 1);
    }
`;

const AddFriendForm = () => {
    return (
        <MainContainer>
            <SearchForm>
                <SearchInput type={"text"} placeholder={"Podaj email..."}/>
                <SearchButton type={"submit"}><FaSearch/></SearchButton>
            </SearchForm>
            <ResultSet>
                <h1 style={{textDecoration: "underline"}}>Wyniki wyszukiwania</h1>
                <ResultRow>
                    Jan Kowalski <Link to={``}><IoPersonAddSharp style={{ fontSize: "3rem", color: "black"}}/></Link>
                </ResultRow>
                <ResultRow>
                    Jan Kowalski <Link to={``}><IoPersonAddSharp style={{ fontSize: "3rem", color: "black"}}/></Link>
                </ResultRow>
                <ResultRow>
                    Jan Kowalski <Link to={``}><IoPersonAddSharp style={{ fontSize: "3rem", color: "black"}}/></Link>
                </ResultRow>
            </ResultSet>
        </MainContainer>
    );
}

export default AddFriendForm;