import { useCallback, useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  Image,
  TextInput,
} from 'react-native';
import { CluesState, CluesAction } from '../types';
import { ViewProps } from '@/lib/core/types';
import * as ImagePicker from 'expo-image-picker';
import { preprocessImage } from './CluesUtils';
import { useCluesAI } from './hooks/useCluesAI';

export const CluesView = ({ state, dispatch }: ViewProps<CluesState, CluesAction>) => {
  const [answer, setAnswer] = useState<string | null>(state.answer);
  const [photoUrl, setPhotoUrl] = useState<string | null>(state.photoUrl);

  useEffect(() => {
    if (state.photoUrl !== photoUrl) {
      void preprocessImage(state.photoUrl!).then(setPhotoUrl).catch(console.warn);
    }
  }, [photoUrl]);

  const {
    handleAnalyze,
    result,
    isDownloading,
    downloadInfo,
    isGenerating,
  } = useCluesAI(photoUrl, answer, dispatch);

  const handleSelectPhoto = useCallback(async () => {
    // Ask for permission
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) {
      alert("Permission to access gallery is required!");
      return;
    }

    // Launch image picker
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: false,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const originalUri = result.assets[0].uri;
      console.log('originalUri', originalUri);
      const processedUri = await preprocessImage(originalUri);
      dispatch({ type: 'PHOTO', payload: originalUri });
      setPhotoUrl(processedUri);
    }
  }, [dispatch]);

  if (isDownloading) {
    return (
      <View style={styles.centerContainer}>
        <ActivityIndicator size="large" />
        {downloadInfo.map((item: { model: string, progress: number }, index: number) => (
          <Text key={index} style={styles.progressText}>
            Downloading {item.model}: {item.progress}%
          </Text>
        ))}
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={[styles.content, styles.centerContainer, { width: 300, height: 300 }]}>
        {state.photoUrl ? <Image source={{ uri: "file://" + state.photoUrl }} style={styles.image} width={300} height={300} /> : <Text>No photo selected</Text>}
      </View >

      <TextInput
        style={styles.input}
        placeholder="Enter your answer"
        onChangeText={setAnswer}
        value={answer || ''}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, state.busy && styles.buttonDisabled]}
          onPress={handleSelectPhoto}
          disabled={state.busy}
        >
          <Text style={styles.buttonText}>Select Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.button, state.busy && styles.buttonDisabled]}
          onPress={handleAnalyze}
          disabled={state.busy}
        >
          <Text style={styles.buttonText}>Analyze</Text>
        </TouchableOpacity>
      </View>

      {result && (
        <View style={styles.centerContainer}>
          <Text style={styles.resultLabel}>CactusLMCompleteResult:</Text>
          <View style={styles.resultBox}>
            <Text style={styles.resultFieldLabel}>success:</Text>
            <Text style={styles.resultValue}>
              {result.success.toString()}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              response:
            </Text>
            <Text style={styles.resultFieldValue}>
              {result.response}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              timeToFirstTokenMs:
            </Text>
            <Text style={styles.resultFieldValue}>
              {result.timeToFirstTokenMs.toFixed(2)}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              tokensPerSecond:
            </Text>
            <Text style={styles.resultFieldValue}>
              {result.tokensPerSecond.toFixed(2)}
            </Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              prefillTokens:
            </Text>
            <Text style={styles.resultFieldValue}>{result.prefillTokens}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              decodeTokens:
            </Text>
            <Text style={styles.resultFieldValue}>{result.decodeTokens}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              totalTimeMs:
            </Text>
            <Text style={styles.resultFieldValue}>{result.totalTimeMs.toFixed(2)}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              tokensPerSecond:
            </Text>
            <Text style={styles.resultFieldValue}>{result.tokensPerSecond.toFixed(2)}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              prefillTokens:
            </Text>
            <Text style={styles.resultFieldValue}>{result.prefillTokens}</Text>

            <Text style={[styles.resultFieldLabel, styles.marginTop]}>
              decodeTokens:
            </Text>
            <Text style={styles.resultFieldValue}>{result.decodeTokens}</Text>
          </View>
        </View>
      )}
    </ScrollView >
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    padding: 20,
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  progressText: {
    marginTop: 16,
    fontSize: 16,
    color: '#000',
  },
  imageButton: {
    height: 160,
    borderWidth: 2,
    borderColor: '#ddd',
    borderRadius: 8,
    borderStyle: 'solid',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  buttonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  resultContainer: {
    marginTop: 16,
  },
  resultValue: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  resultLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000',
  },
  resultBox: {
    backgroundColor: '#f3f3f3',
    padding: 12,
    borderRadius: 8,
  },
  resultFieldLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666',
    marginBottom: 4,
  },
  resultFieldValue: {
    fontSize: 14,
    color: '#000',
    lineHeight: 20,
  },
  marginTop: {
    marginTop: 12,
  },
  errorContainer: {
    backgroundColor: '#000',
    padding: 12,
    borderRadius: 8,
    marginTop: 16,
  },
  errorText: {
    color: '#fff',
    fontSize: 14,
  }
});