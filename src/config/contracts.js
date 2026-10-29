// Required keys, value types and fixed tuple lengths for each designer-editable area.
// These contracts contain no tuning values; update them when adding a setting.
const freeze = value => { if (value && typeof value === 'object') { Object.values(value).forEach(freeze); Object.freeze(value); } return value; };
export const CONFIG_CONTRACTS = freeze({
  "pasture": {
    "roughChance": "number",
    "roughClumps": "integer",
    "roughPatches": "integer",
    "roughRocks": "integer"
  },
  "terrain": {
    "unlockIndex": "integer",
    "selectionProbability": "number",
    "maximumRelief": "number",
    "maximumSlopeDegrees": "number",
    "waveAmplitude": "number",
    "valleyLift": "number",
    "channelDepth": "number",
    "waterDepth": "number",
    "downstreamDrop": "number",
    "waterEdgeInset": "number",
    "bridgeLift": "number",
    "poolMaximumSlopeDegrees": "number",
    "poolMaximumHeightRange": "number",
    "poolLowlandHeight": "number"
  },
  "gameplay": {
    "simulation": {
      "maximumStepSeconds": "number",
      "dogSpeed": "number",
      "dogRadius": "number",
      "signalRadius": "number",
      "barkRadiusBoost": "number",
      "pressureExponent": "number",
      "signalStrength": "number",
      "sheepSpeed": "number",
      "cowSpeed": "number",
      "boltSpeed": "number",
      "homeSpeed": "number",
      "sheepResponse": "number",
      "cowResponse": "number",
      "holdResponse": "number",
      "neighborRadius": "number",
      "cohesionDistance": "number",
      "cohesionStrength": "number",
      "alignmentStrength": "number",
      "admissionAttendance": "number"
    },
    "bark": {
      "cooldownSeconds": "number",
      "durationSeconds": "number"
    },
    "body": {
      "sheepRadius": "number",
      "cowRadius": "number"
    },
    "companions": {
      "clusterSeconds": "number",
      "attendanceRadius": "number",
      "resumeRadius": "number",
      "initialRadius": "number",
      "droneSpeed": "number"
    },
    "saved": {
      "reservationSeconds": "number",
      "patchSpacing": "number",
      "maximumSpeed": "number"
    },
    "wander": {
      "checkRange": [
        "number",
        "number"
      ],
      "cohortFraction": "number",
      "unlockIndex": "integer",
      "boltUnlockIndex": "integer",
      "middleLevel": "integer",
      "lateLevel": "integer",
      "wanderChance": [
        "number",
        "number",
        "number"
      ],
      "boltChance": [
        "number",
        "number"
      ],
      "boltDurationEarly": [
        "number",
        "number"
      ],
      "boltDurationMiddle": [
        "number",
        "number"
      ],
      "boltDurationLate": [
        "number",
        "number"
      ],
      "ordinarySeconds": "number",
      "ordinaryDistance": [
        "number",
        "number"
      ]
    }
  },
  "audio": {
    "mix": {
      "masterGain": "number",
      "musicGain": "number",
      "effectsGain": "number",
      "ambienceGain": "number",
      "smoothingSeconds": "number"
    },
    "scheduler": {
      "startLeadSeconds": "number",
      "intervalMs": "number",
      "lookAheadSeconds": "number",
      "maxStepsPerTick": "integer"
    },
    "birds": {
      "clearDelaySeconds": "number",
      "clearJitterSeconds": "number",
      "rainDelaySeconds": "number",
      "rainJitterSeconds": "number",
      "frameCapSeconds": "number",
      "rainSuppressionIntensity": "number",
      "clearGain": "number",
      "rainGain": "number"
    },
    "livestock": {
      "frameCapSeconds": "number",
      "alertThreshold": "number",
      "initialDelaySeconds": "number",
      "initialJitterSeconds": "number",
      "calmDelaySeconds": "number",
      "calmJitterSeconds": "number",
      "herdedDelaySeconds": "number",
      "herdedJitterSeconds": "number",
      "sheepIntervalScale": "number",
      "maxStartsPerFrame": "integer",
      "maxVoices": "integer",
      "maxDistance": "number",
      "attenuationDistance": "number",
      "gain": "number",
      "herdedGainScale": "number",
      "cowPitchBase": "number",
      "cowPitchSpread": "number",
      "cowPitchVariation": "number",
      "sheepPitchBase": "number",
      "sheepPitchSpread": "number",
      "sheepPitchVariation": "number",
      "durationMinScale": "number",
      "durationMaxScale": "number",
      "durationBaseScale": "number",
      "durationSpread": "number",
      "durationVariation": "number"
    },
    "voices": {
      "loadTimeoutMs": "number",
      "noiseBufferSeconds": "number",
      "startLeadSeconds": "number",
      "barkDurationSeconds": "number",
      "cowDurationSeconds": "number",
      "sheepDurationSeconds": "number",
      "livestockFadeSeconds": "number",
      "livestockFadeFraction": "number",
      "livestockAttackSeconds": "number",
      "livestockAttackFraction": "number",
      "stopPaddingSeconds": "number"
    },
    "weather": {
      "defaultIntensity": "number",
      "stormRainScale": "number",
      "heavyRainScale": "number",
      "lightRainScale": "number",
      "rainGain": "number",
      "windGain": "number",
      "rainLowpassHz": "number",
      "windLowpassHz": "number",
      "gainChangeThreshold": "number",
      "smoothingSeconds": "number"
    },
    "thunder": {
      "eventToleranceSeconds": "number",
      "startLeadSeconds": "number",
      "durationSeconds": "number",
      "durationJitterSeconds": "number",
      "duckMusicGain": "number",
      "duckSeconds": "number",
      "recoveryFraction": "number",
      "recoverySeconds": "number"
    },
    "effects": {
      "maxVoices": "integer",
      "barkGain": "number",
      "pipPitch": "number",
      "phraseSpacingSeconds": "number",
      "noteDurationSeconds": "number",
      "noteGain": "number"
    }
  },
  "music": {
    "transport": {
      "tempo": "number"
    },
    "score": {
      "swing": "number",
      "chordRollSeconds": "number",
      "chordDurationEighths": "number",
      "chordGain": "number",
      "answerChordGain": "number",
      "bassDurationEighths": "number",
      "bassGain": "number",
      "bassFillDurationEighths": "number",
      "bassFillGain": "number",
      "melodyDurationEighths": "number",
      "melodyGain": "number",
      "kickDurationSeconds": "number",
      "kickGain": "number",
      "pickupKickGain": "number",
      "tapDelaySeconds": "number",
      "tapDurationSeconds": "number",
      "tapGain": "number",
      "answerTapDurationSeconds": "number",
      "answerTapGain": "number",
      "keyPartialDurationScale": "number",
      "keyPartialGainScale": "number"
    },
    "voices": {
      "maxActive": "integer",
      "bassAttackSeconds": "number",
      "percussionAttackSeconds": "number",
      "melodyAttackSeconds": "number",
      "keysAttackSeconds": "number",
      "melodyLowpassHz": "number",
      "keysLowpassHz": "number",
      "bassLowpassHz": "number",
      "releaseSeconds": "number",
      "stopPaddingSeconds": "number",
      "pauseReleaseSeconds": "number",
      "pauseStopSeconds": "number"
    }
  },
  "presentation": {
    "terrain": {
      "groundSpacing": "number",
      "surfaceSpacing": "number"
    },
    "waterVegetation": {
      "bodyChance": "number",
      "maximumClumps": "integer",
      "areaPerClump": "number",
      "edgeFalloffMeters": "number",
      "grassHeight": "number",
      "reedHeight": "number"
    },
    "renderer": {
      "pixelRatioCap": "number",
      "exposure": "number",
      "environmentSaturation": "number",
      "shadowMapSize": "integer",
      "fogNear": "number",
      "fogFar": "number"
    },
    "lighting": {
      "skyDay": "string",
      "skyStorm": "string",
      "hemisphereSky": "string",
      "hemisphereGround": "string",
      "sunColor": "string",
      "hemisphereIntensity": "number",
      "sunIntensity": "number",
      "sunOffset": [
        "number",
        "number",
        "number"
      ],
      "hemisphereFlashScale": "number",
      "stormSkyBlend": "number",
      "shadowBias": "number",
      "shadowNormalBias": "number"
    },
    "camera": {
      "portraitAspect": "number",
      "previewPortraitHeight": "number",
      "previewLandscapeHeight": "number",
      "playPortraitHeight": "number",
      "playLandscapeHeight": "number",
      "previewPortraitOffsetX": "number",
      "previewLandscapeOffsetX": "number",
      "previewOffsetZ": "number",
      "followOffsetZ": "number",
      "previewFollowRate": "number",
      "playFollowRate": "number",
      "lagFraction": "number",
      "positionY": "number",
      "positionOffsetZ": "number",
      "lookOffsetZ": "number",
      "near": "number",
      "far": "number"
    },
    "culling": {
      "sceneryMargin": "number",
      "animalMargin": "number"
    },
    "introduction": {
      "durationSeconds": "number",
      "fadeInSeconds": "number",
      "fadeOutSeconds": "number",
      "initialScale": "number",
      "scaleGrowth": "number",
      "signHoldSeconds": "number",
      "signFadeSeconds": "number"
    },
    "effects": {
      "celebrationParticles": "integer",
      "celebrationLifeSeconds": "number",
      "particleGravity": "number",
      "maxBarkRings": "integer",
      "barkSeconds": "number",
      "barkExpansion": "number",
      "barkOpacity": "number"
    },
    "minimap": {
      "viewDepth": "number"
    }
  },
  "weather": {
    "unlock": {
      "sunOnlyThrough": "integer",
      "rainLevel": "integer",
      "heavyRainLevel": "integer",
      "stormLevel": "integer"
    },
    "selection": {
      "earlySunCutoff": "number",
      "rainCutoffs": [
        "number",
        "number"
      ],
      "heavyRainCutoffs": [
        "number",
        "number",
        "number"
      ],
      "stormCutoffs": [
        "number",
        "number",
        "number",
        "number"
      ]
    },
    "presets": {
      "sun": {
        "rainIntensity": "number",
        "windIntensity": "number",
        "severity": "number",
        "cloudCoverage": "number",
        "daylight": "number"
      },
      "wind": {
        "rainIntensity": "number",
        "windIntensity": "number",
        "severity": "number",
        "cloudCoverage": "number",
        "daylight": "number"
      },
      "rain": {
        "rainIntensity": "number",
        "windIntensity": "number",
        "severity": "number",
        "cloudCoverage": "number",
        "daylight": "number"
      },
      "heavy-rain": {
        "rainIntensity": "number",
        "windIntensity": "number",
        "severity": "number",
        "cloudCoverage": "number",
        "daylight": "number"
      },
      "storm": {
        "rainIntensity": "number",
        "windIntensity": "number",
        "severity": "number",
        "cloudCoverage": "number",
        "daylight": "number"
      }
    },
    "ambience": {
      "windBase": "number",
      "windScale": "number",
      "rainParticles": "integer",
      "wetButterflies": "integer",
      "dryButterflies": "integer",
      "birds": "integer",
      "squirrels": "integer"
    },
    "lightning": {
      "startSeconds": "number",
      "intervalSeconds": "number",
      "thunderDelaySeconds": "number",
      "flashSeconds": "number",
      "flashStrength": "number"
    }
  },
  "controls": {
    "pointer": {
      "joystickRangePixels": "number",
      "tapMovementPixels": "number",
      "doubleTapDistancePixels": "number",
      "doubleTapMs": "number",
      "compatibilityClickMs": "number"
    },
    "frame": {
      "maxDeltaSeconds": "number",
      "mapIntervalSeconds": "number"
    },
    "feedback": {
      "barkVibrationMs": "number",
      "toastMs": "number",
      "modalFocusDelayMs": "number",
      "urgentCountdownSeconds": "number"
    },
    "tips": {
      "cycleSeconds": "number",
      "initialSeconds": "number"
    }
  },
  "delivery": {
    "campaign": {
      "maximumLevelNumber": "integer"
    },
    "reward": {
      "base": "integer",
      "perLevel": "integer"
    },
    "countdown": {
      "minimumSeconds": "number",
      "maximumSeconds": "number",
      "baseRobots": "integer",
      "extraRobotsPerSecond": "integer",
      "extraRouteSeconds": "number",
      "journeyMetersPerStep": "number",
      "journeySecondsPerStep": "number"
    },
    "profile": {
      "maximumPoints": "integer"
    }
  },
  "progression": {
    "upgrades": {
      "speed": {
        "costs": [
          "integer",
          "integer",
          "integer"
        ],
        "unlockLevels": [
          "integer",
          "integer",
          "integer"
        ]
      },
      "flock": {
        "costs": [
          "integer",
          "integer",
          "integer"
        ],
        "unlockLevels": [
          "integer",
          "integer",
          "integer"
        ]
      },
      "drone": {
        "costs": [
          "integer",
          "integer",
          "integer"
        ],
        "unlockLevels": [
          "integer",
          "integer",
          "integer"
        ]
      },
      "helper": {
        "costs": [
          "integer",
          "integer",
          "integer"
        ],
        "unlockLevels": [
          "integer",
          "integer",
          "integer"
        ]
      },
      "bark": {
        "costs": [
          "integer",
          "integer",
          "integer"
        ],
        "unlockLevels": [
          "integer",
          "integer",
          "integer"
        ]
      },
      "cohesion": {
        "costs": [
          "integer",
          "integer",
          "integer"
        ],
        "unlockLevels": [
          "integer",
          "integer",
          "integer"
        ]
      }
    },
    "effects": {
      "speedBoost": [
        "number",
        "number",
        "number",
        "number"
      ],
      "signalBoost": [
        "number",
        "number",
        "number",
        "number"
      ],
      "cohesionBoost": [
        "number",
        "number",
        "number",
        "number"
      ],
      "droneStrength": [
        "number",
        "number",
        "number",
        "number"
      ],
      "helperStrength": [
        "number",
        "number",
        "number",
        "number"
      ],
      "bark": {
        "baseMultiplier": "number",
        "tierOneBoost": "number",
        "advancedMultiplier": "number",
        "charges": [
          "integer",
          "integer",
          "integer",
          "integer"
        ]
      }
    }
  }
});
