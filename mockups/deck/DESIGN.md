# Design mock-up B: "Flight deck"

A proposal only. It does not touch the live app. Build with `python3 mockups/deck/build.py`;
open `mockups/deck/index.html`.

## Direction
Borrowed from things a student pilot actually uses, each one doing a job:
- **Airfield signs as the navigation.** The tab bar is a sign array: yellow direction signs for the places you can go,
  and a black location sign with yellow letters and border for where you are. Primary buttons are the same sign yellow.
  This is the one bold element.
- **Checklists.** Today's plan is a challenge-and-response checklist: item, leader dots, response.
- **ASI-style gauges for readiness.** Red arc below 50%, amber from 50% to the 75% pass mark, green from 75%.
  A pointer shows where you are, and a digital readout gives the number.
- **Annunciator lights** for a topic's four steps (pre-test, read, cards, quiz).
- **Radio display** on the Radio page: active frequency in green, standby in cyan, with the exchange below.
- **Mock-exam timer** in a green readout.

## Tokens
| Name | Light | Dark |
|---|---|---|
| Deck (page) | `#E4E7EA` | `#1B1F23` |
| Panel | `#FFFFFF` | `#262B30` |
| Ink | `#15191E` | `#EEF1F4` |
| Sign yellow / black | `#F7C600` / `#000000` | same |
| Arcs red, amber, green | `#CF2338`, `#E0A100`, `#23924A` | same |
| Selected (cyan) | `#00799F` | `#4FD8F5` |

Type: **B612**, the typeface Airbus designed for cockpit displays (open licence), in regular and bold for everything.

## Kept from mock-up A
Grouped rows rather than a card per item, the same screens and content, two columns on tablets, generous tap targets.
