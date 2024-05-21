import react, {useEffect, useState} from "react";
import styled from "styled-components";
import { FaSearch } from "react-icons/fa";
import { IoPersonAddSharp } from "react-icons/io5";
import {MdDelete} from "react-icons/md";
import {Link} from "react-router-dom";
import React from "react";
import {getEmails} from "../../service/FriendsService";

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
   width: 50%;
`;

const SearchInput = styled.input`
    margin: 1rem;
    font-size: 1rem;
    border-radius: 12px;
    border: solid 1px black;
    padding: 12px;
    width: 100%;
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

    const [emails, setEmails] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredEmails, setFilteredEmails] = useState([]);

    const fetchEmails = async () => {
        const emailsData = await getEmails();
        setEmails(emailsData);
    }

    useEffect(() => {
        fetchEmails();
    }, []);

    useEffect(() => {
        const results = emails.filter(email =>
            email.email.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredEmails(results);
    }, [searchTerm, emails]);

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <MainContainer>
            <SearchForm>
                <SearchInput type={"text"}
                             placeholder={"Podaj email..."}
                             value={searchTerm}
                             onChange={handleSearchChange}
                />
            </SearchForm>
            <ResultSet>
                <h1 style={{textDecoration: "underline"}}>Wyniki wyszukiwania</h1>
                {!searchTerm ? (
                        <div>Podaj email, aby rozpocząć wyszukiwanie</div>
                ) : filteredEmails.length === 0 ? (
                        <div>Brak rezultatów</div>
                ) : (
                    filteredEmails.map((email) => (
                        <ResultRow key={email.id}>
                            {email.firstName} {email.lastName} <Link to={``}><IoPersonAddSharp style={{ fontSize: "3rem", color: "black"}}/></Link>
                        </ResultRow>
                    ))
                )}
            </ResultSet>
        </MainContainer>
    );
}

export default AddFriendForm;