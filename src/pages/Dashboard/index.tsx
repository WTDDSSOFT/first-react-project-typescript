import React, { useState, useEffect, FormEvent } from 'react';
import logoImg from '../../assets/logo.svg';
import { Link } from 'react-router-dom';
import api from '../../services/api';
import { FiChevronRight } from 'react-icons/fi';

import { Title, Form, Repositories, Error } from './style';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}
/**O fomato da função(tipo)  */
const Dashboard: React.FC = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inpurtError, setInputError] = useState('');
  const [repositories, setReposiories] = useState<Repository[]>(() => {
    const storageRepositories = localStorage.getItem(
      '@GithuExplore:repositories',
    );

    if (storageRepositories) {
      return JSON.parse(storageRepositories); //disconvete para transforma num array will
    }
    return []; //arrya empyt
  });

  /**salve in localstorege */
  useEffect(() => {
    localStorage.setItem(
      '@GithuExplore:repositories',
      JSON.stringify(repositories),
    );
  }, [repositories]);

  async function handleAddRepository(
    event: FormEvent<HTMLFormElement>,
  ): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInputError('Digite o autor/nome do repositório');
      return;
      /**this return avoid to execulte this part  */
    }
    try {
      //add new repository

      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setReposiories([...repositories, repository]);
      setNewRepo(''); //clean input
      setInputError('');
    } catch (err) {
      setInputError('Erro na busca por esse repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Github Explorer" />
      <Title>Exploere repositórios no github</Title>
      <Form hasError={!!inpurtError} onSubmit={handleAddRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          placeholder="Digite o nome do respositorio"
        />
        <button type="submit">Perquisa</button>
      </Form>
      {/* one type of if, but without  else*/}
      {inpurtError && <Error>{inpurtError}</Error>}
      <Repositories>
        {repositories.map((repository) => (
          <Link
            key={repository.full_name}
            to={`/repositories/${repository.full_name}`}
          >
            <img
              src={repository.owner.avatar_url}
              alt={repository.owner.login}
            />
            <div>
              <strong>{repository.full_name}</strong>
              <p>{repository.description}}</p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}
      </Repositories>
    </>
  );
};

export default Dashboard;
