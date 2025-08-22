# Sécurité et conformité OWASP

Les mesures mises en place dans le projet **Collector** permettent de couvrir les **10 principales failles de sécurité décrites par l’OWASP**.

Ce document est aussi valable pour la partie **backend** du projet **Collector** (https://github.com/zHatsuharu/collector-back).

## Couverture des risques OWASP (10 points)

1. **Contrôle des accès défaillant (Broken Access Control)**  
   - Vérification stricte des permissions utilisateurs.  
   - Accès aux collections limité au propriétaire authentifié.  

2. **Défauts cryptographiques (Cryptographic Failures)**  
   - Stockage sécurisé des mots de passe (hash + salt).  
   - Utilisation de HTTPS recommandée pour les échanges.  

3. **Injection (SQL, NoSQL, etc.)**  
   - Utilisation d’ORM ou requêtes préparées pour prévenir les injections.  

4. **Conception non sécurisée (Insecure Design)**  
   - Authentification obligatoire pour accéder aux données sensibles.  
   - Absence d’actions critiques sans contrôle préalable.  

5. **Mauvaise configuration de sécurité (Security Misconfiguration)**  
   - Gestion des variables sensibles via fichiers `.env` (non versionnés).  
   - Désactivation des logs sensibles en production.  

6. **Composants vulnérables (Vulnerable Components)**  
   - Mise à jour régulière des dépendances.  
   - Utilisation d’outils de scan (ex : `npm audit`).  

7. **Identification et authentification défaillantes (Identification and Authentication Failures)**  
   - Gestion stricte de la session utilisateur.  
   - Déconnexion / expiration automatique prévue.  

8. **Défaillance d’intégrité logicielle et des données (Software and Data Integrity Failures)**  
   - Vérification d’intégrité des dépendances avant intégration.  
   - Limitation des bibliothèques externes non maintenues.  

9. **Problèmes de logging et monitoring (Security Logging & Monitoring Failures)**  
   - Journalisation des événements critiques (connexion, erreurs).  
   - Détection d’accès non autorisés.  

10. **Failles côté serveur (Server-Side Request Forgery - SSRF)**  
   - Aucune requête externe non contrôlée par l’utilisateur.  
   - Filtrage des entrées utilisateur avant usage dans des appels externes.  

---

## Conclusion
Ces mesures permettent d’assurer un **niveau de sécurité conforme aux recommandations OWASP**.  
Elles doivent être régulièrement réévaluées lors des évolutions du projet.
