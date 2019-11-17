CREATE SEQUENCE if not exists public.usr_id_seq
    INCREMENT 1
    START 1
    MINVALUE 1
    MAXVALUE 9223372036854775807
    CACHE 1;

ALTER SEQUENCE public.usr_id_seq
    OWNER TO postgres;

CREATE TABLE if not exists public.usr
(
    id bigint NOT NULL DEFAULT nextval('usr_id_seq'::regclass),
    acc_non_exp boolean,
    acc_non_lock boolean,
    cred_non_exp boolean,
    enabled boolean,
    password character varying(255) COLLATE pg_catalog."default",
    username character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT usr_pkey PRIMARY KEY (id),
    CONSTRAINT uk_dfui7gxngrgwn9ewee3ogtgym UNIQUE (username)

)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.usr
    OWNER to postgres;

CREATE TABLE if not exists public.user_role
(
    user_id bigint NOT NULL,
    authorities character varying(255) COLLATE pg_catalog."default",
    CONSTRAINT fkfpm8swft53ulq2hl11yplpr5 FOREIGN KEY (user_id)
        REFERENCES public.usr (id) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT DEFERRABLE
)
WITH (
    OIDS = FALSE
)
TABLESPACE pg_default;

ALTER TABLE public.user_role
    OWNER to postgres;
