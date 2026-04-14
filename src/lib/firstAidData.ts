const firstAidData = {
  "CPR": {
    when: "When a person is completely unresponsive, not breathing, or only gasping.",
    steps: [
      "Ensure the area is safe and lay the person flat on their back on a firm surface.",
      "Place the heel of one hand on the center of their chest, and place your other hand on top, interlocking fingers.",
      "Push hard and fast: at least 2 inches deep, at a rate of 100-120 pushes a minute.",
      "Allow the chest to recoil completely between pushes.",
      "Continue without stopping until medical help takes over or the person starts breathing."
    ],
    notToDo: [
      "Do NOT attempt rescue breaths if you are not trained; stick to Hands-Only CPR.",
      "Do NOT pause compressions for more than 10 seconds."
    ]
  },
  "Choking": {
    when: "When a person is clutching their throat, unable to speak, cough effectively, or breathe.",
    steps: [
      "Stand behind the person with one leg slightly forward for balance.",
      "Make a fist with one hand and place the thumb side just above their belly button.",
      "Grasp your fist with your other hand.",
      "Deliver quick, upward inward thrusts as if trying to lift them off their feet.",
      "Continue until the object is forced out or the person becomes unresponsive (then begin CPR)."
    ],
    notToDo: [
      "Do NOT do a blind finger sweep if you cannot see the object, as you may push it deeper."
    ]
  },
  "Severe Bleeding": {
    when: "Blood is spurting heavily, flowing continuously, or rapidly soaking through clothes.",
    steps: [
      "Expose the wound by removing or cutting away clothing.",
      "Apply direct, firm pressure on the wound using a clean cloth, sterile dressing, or your hands.",
      "Maintain continuous strong pressure for at least 5-10 minutes without peeking to see if the bleeding stopped.",
      "If bleeding soaks through, add more cloth on top—do not remove the original dressing.",
      "If on an arm or leg and pressure does not work, apply a tourniquet securely above the wound."
    ],
    notToDo: [
      "Do NOT remove an impaled object (like a knife or glass); press tightly around it.",
      "Do NOT peek to check the bleeding, as it breaks the clotting."
    ]
  },
  "Burns": {
    when: "For burns from heat, flames, hot liquids, or electricity.",
    steps: [
      "Move the person away from the source of the burn immediately.",
      "Cool the burn by holding it under cool (not cold) running water for 10 to 20 minutes.",
      "Remove tight items like rings or belts from the burned area before it swells.",
      "Cover the burn loosely with a sterile, non-fluffy dressing or plastic wrap."
    ],
    notToDo: [
      "Do NOT apply ice, butter, grease, toothpaste, or ointments.",
      "Do NOT break blisters or peel off dead skin.",
      "Do NOT remove clothing that is stuck to the burn."
    ]
  },
  "Fracture": {
    when: "Suspected broken bone due to severe trauma, unnatural angle, or intense pain when moving.",
    steps: [
      "Keep the person as still as possible; restrict movement.",
      "If there is an open wound with the bone exposed, cover it with a sterile dressing.",
      "Support the injured area using a DIY splint (like folded cardboard or a magazine) and tie it loosely.",
      "Apply an ice pack wrapped in a cloth to reduce swelling."
    ],
    notToDo: [
      "Do NOT attempt to realign or pop the bone back into place.",
      "Do NOT move the person if you suspect a spine, neck, or head injury unless they are in immediate danger."
    ]
  },
  "Stroke": {
    when: "Using the F.A.S.T. check: Face drooping, Arm weakness, Speech difficulty, Time to call ambulance.",
    steps: [
      "Note the exact time you first noticed the symptoms.",
      "Keep the person calm, comfortable, and lying down with their head slightly elevated.",
      "Stay with the person and monitor their breathing continuously."
    ],
    notToDo: [
      "Do NOT give them any food, water, or medication (not even aspirin), due to choking risk."
    ]
  },
  "Heart Attack": {
    when: "Heavy chest pain, pressure, or discomfort, often spreading to the arms, neck, or jaw, accompanied by shortness of breath.",
    steps: [
      "Have the person sit down, rest, and try to keep calm.",
      "Loosen any tight clothing around the neck and chest.",
      "If the person is not allergic and conscious, have them slowly chew and swallow an aspirin.",
      "If they become unresponsive and stop breathing, begin CPR immediately."
    ],
    notToDo: [
      "Do NOT let the person drive themselves to the hospital.",
      "Do NOT wait to see if the symptoms pass before calling an ambulance."
    ]
  },
  "Fainting": {
    when: "Temporary loss of consciousness followed by an immediate return to a wakeful state.",
    steps: [
      "Lie the person down on their back.",
      "Elevate their legs about 12 inches above heart level to restore blood flow to the brain.",
      "Loosen tight clothing, like belts or collars.",
      "When they wake up, ensure they get up slowly."
    ],
    notToDo: [
      "Do NOT splash water on their face or slap them to wake them up.",
      "Do NOT attempt to force them to sit up or stand immediately."
    ]
  },
  "Sprain": {
    when: "A twisted or stretched joint causing pain, swelling, bruising, and restricted movement.",
    steps: [
      "Follow the R.I.C.E protocol.",
      "REST the injured area.",
      "ICE the area for 15-20 minutes every few hours (never ice directly on skin).",
      "COMPRESS the joint with a bandage to prevent swelling.",
      "ELEVATE the injured limb above the heart if possible."
    ],
    notToDo: [
      "Do NOT apply heat or massage the area during the first 48 hours."
    ]
  },
  "Allergic Reaction": {
    when: "Severe reaction (anaphylaxis) causing difficulty breathing, swelling of throat/face, or fainting.",
    steps: [
      "If they have an epinephrine auto-injector (EpiPen), help them administer it immediately in the mid-outer thigh.",
      "Have the person lie flat (or sit if breathing is difficult), and elevate their legs.",
      "Keep the person calm and reassure them.",
      "If the person loses consciousness and stops breathing, perform CPR."
    ],
    notToDo: [
      "Do NOT make the person stand up.",
      "Do NOT wait to call 108; an allergic reaction can become fatal in minutes."
    ]
  },
  "Poisoning": {
    when: "Suspected ingestion, inhalation, or skin contact with a toxic substance.",
    steps: [
      "Identify the poison if possible (find the container or bottle).",
      "Move the person to fresh air if they inhaled poison.",
      "If swallowed and they are awake, wipe their mouth clean.",
      "Contact Poison Control immediately (1800-116-117) or call 108, and strictly follow their instructions."
    ],
    notToDo: [
      "Do NOT give them water, milk, or any food unless Poison Control specifically instructed.",
      "Do NOT induce vomiting (making them throw up) as the chemical may burn on the way back up."
    ]
  },
  "Emergency Childbirth": {
    when: "Labor is progressing rapidly and birth is imminent before medical help arrives.",
    steps: [
      "Ensure privacy, gather clean towels or blankets, and wash your hands.",
      "Support the baby’s head as it emerges—do NOT pull.",
      "Once delivered, dry the baby immediately and place them directly on the mother's bare chest.",
      "Cover both of them to keep them warm.",
      "Wait for the placenta to naturally deliver. Do NOT cut the umbilical cord—leave that to professionals."
    ],
    notToDo: [
      "Do NOT pull on the baby or the umbilical cord.",
      "Do NOT try to delay or stop the birth (e.g., crossing the mother's legs)."
    ]
  },
  "Acid Attack / Chemical Burn": {
    when: "Chemicals or acid come into direct contact with skin or eyes.",
    steps: [
      "Ensure your own safety first—do not touch the chemical with bare hands.",
      "Immediately flush the affected area with copious amounts of clean, running water. Ensure the water drains away from unaffected skin.",
      "Continue flushing continuously for at least 20 minutes.",
      "Carefully cut or gently remove contaminated clothing or jewelry while flushing.",
      "If the eye is affected, run water over the eye ensuring it flows away from the other eye."
    ],
    notToDo: [
      "Do NOT try to neutralize the acid with an alkali (like baking soda) or milk.",
      "Do NOT wipe the skin, as it may spread the chemical."
    ]
  }
};

export default firstAidData;
