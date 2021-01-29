import React from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faGithub} from "@fortawesome/free-brands-svg-icons";

const Github = () => {
    const repositories = [
        {name: 'SpeedTrack ™ Bandwidth Speed Monitor', url: 'https://github.com/gmurambadoro/speedtrack-full-stack'},
        {name: 'SpeedTrack CLI', url: 'https://github.com/gmurambadoro/speedtrack-cli'},
    ];

    const renderGithub = (repository) => {
        const { name, url } = repository;

        return (
            <p key={name}><a href={url} rel="noreferrer" target="_blank">{name}</a></p>);
    };

    return (
        <div>
            <br />

            <p>
                <strong><FontAwesomeIcon icon={faGithub} /> GitHub Repositories</strong>
            </p>

            {repositories.map(repository => renderGithub(repository))}
        </div>
    );
};

export default Github;