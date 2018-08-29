CREATE SCHEMA SAP_DIANA_ADMIN;
GRANT SELECT ON SCHEMA SAP_DIANA_ADMIN to _SYS_REPO WITH GRANT OPTION;

create COLUMN table SAP_DIANA_ADMIN.TABLES
(
    ID BIGINT GENERATED BY DEFAULT AS IDENTITY,
    name nvarchar(200),
    pk nvarchar(200),
    type nvarchar(200),
    schema_name nvarchar(200),
    create_date timestamp,
    PRIMARY KEY (ID)
);

create COLUMN table SAP_DIANA_ADMIN.SCHEMA_TABLE
(
    ID BIGINT GENERATED BY DEFAULT AS IDENTITY,
    name nvarchar(200),
    PRIMARY KEY (ID)
);