--DML adicionando cargas inicais
INSERT INTO contato(name, phone, email, adress, pic, id_cont_social, id_contact_group, id_work)
VALUES
    ('Alejandro', '51324678905', '', '', '','2','1',''),
    ('Sofia', '84621536987', '','Pirituba', '', '1','3','2'),
    ('Carmen', '61234785962', 'seu@email.com', '', '', '3','4',''),
    ('Zaida', '95135784628', '', '', 'http://suafoto.com','4','2','1');

INSERT INTO  work_info( title, company)
VALUES
    ('Chefe de Operações', 'Grupo Globo'),
    ('Logistica', 'GPA');
    
INSERT INTO grupo(name,descrisption)
    VALUES
    ('familia', 'grupo familiar'),
    ('trabalho', 'trabalho mesmo'),
    ('amigos', 'amigos próximos');

INSERT INTO contact_group(id_contact, id_group)
VALUES
    ('1', '3'),
    ('3','2'),
    ('2','4'),
    ('4','1');
    
INSERT INTO social_midia(name, user, link)
VALUES
    ('Instagram','anne','https://instagram.com'),
    ('Facebook','efrain', 'https:facebook.com'),
    ('linkedIn','Handy', 'https:linkedin.com');
    
INSERT INTO contact_social(id_contac, id_soc_midia)
VALUES
    ('2','3'),
    ('1','1'),
    ('3','2'),
    ('4','1');
    