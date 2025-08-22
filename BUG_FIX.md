# Plan de corrections de bogues – Projet Collector

## 1. Objectif
Ce document définit le processus de gestion et de correction des bogues rencontrés dans l’application **Collector**.  
Il permet d’assurer un suivi clair, une priorisation des anomalies et une traçabilité jusqu’à leur résolution.

---

## 2. Processus de gestion des bogues
1. **Détection**  
   - Le bogue est identifié lors des tests, en production, ou signalé par un utilisateur.
   - Capture d’écran et contexte d’utilisation recommandés.

2. **Enregistrement**  
   - Création d’un ticket dans l’outil de suivi (GitHub Issues).  
   - Description minimale :  
     - Étapes pour reproduire  
     - Résultat attendu  
     - Résultat obtenu  
     - Environnement (navigateur, version, device)

3. **Classification**  
   - Catégorisation selon le type :  
     - **UI/UX** : affichage, ergonomie  
     - **Fonctionnel** : logique métier incorrecte  
     - **Technique** : crash, erreur serveur, API, sécurité  

4. **Priorisation**  
   - **Critique (P1)** : bloque l’usage de l’application ou impacte la sécurité  
   - **Majeur (P2)** : gêne importante mais contournable  
   - **Mineur (P3)** : anomalie esthétique ou faible impact  

5. **Correction**  
   - Assignation du ticket à un développeur.  
   - Développement de la correction (nouvelle branche `fix/xxx`).  
   - Tests unitaires et de recette associés.  

6. **Validation**  
   - Pull Request créée et revue par un pair.  
   - Passage en recette (tests manuels ou automatisés).  
   - Marquage du bogue comme corrigé et fermeture du ticket.  

---

## 3. Organisation & responsabilités
- **Développeur** : correction du bogue, documentation technique.  
- **QA / Testeur** : reproduction, vérification de la correction.  
- **Chef de projet / PO** : priorisation et validation finale.  

---

## 4. Suivi des corrections
Un tableau de suivi des bogues est tenu dans GitHub (Issues) et peut être résumé ici :

| ID Bogue | Description | Priorité | Statut | Assigné à | Date ouverture | Date correction |
|----------|-------------|----------|--------|-----------|----------------|-----------------|
| BUG-001  | Erreur de connexion avec identifiants valides | P1 | Ouvert | Dev A | 20/08/2025 |  |
| BUG-002  | Carte Yu-Gi-Oh non supprimée de la collection | P2 | En cours | Dev B | 21/08/2025 |  |
| BUG-003  | Texte alternatif manquant sur certaines cartes Pokémon | P3 | À valider | Dev C | 22/08/2025 |  |

---

## 5. Délais de correction (SLA cible)
- **P1 Critique** : correction sous 24/48h  
- **P2 Majeur** : correction sous 1 semaine  
- **P3 Mineur** : correction sous 1 à 2 sprints  

---

## 6. Améliorations continues
- Mise en place de **tests automatisés** pour prévenir les régressions.  
- Vérification des bogues corrigés lors de chaque **cahier de recette**.  
- Analyse des causes récurrentes pour ajuster les pratiques de développement.  
