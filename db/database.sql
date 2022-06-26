create TABLE project(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description VARCHAR(1500),
    created Date NOT NULL,
    updated Date,
    status VARCHAR(255) NOT NULL,
    ownerId VARCHAR(255),
    icon VARCHAR(1000)
);

create TABLE task(
    id uuid DEFAULT uuid_generate_v4 () PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description VARCHAR(1500),
    created Date NOT NULL,
    updated Date,
    type VARCHAR(255) NOT NULL,
    status VARCHAR(255) NOT NULL,
    project_id uuid NOT NULL,
    FOREIGN KEY (project_id) REFERENCES project (id)
);