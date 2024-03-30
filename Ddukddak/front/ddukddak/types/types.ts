export interface BookSummary {
  bookId: number;
  bookTitle: string;
  coverImage: string;
}

export interface DetailBook {
  bookAuthor: string;
  bookStory: string;
  isLike: Boolean;
  mainName: string;
  subName: string;
}

export interface PhotoData {
  photoId: number;
  photoFile: string;
}

export interface SelectablePhotoData extends PhotoData{
  selected: boolean;
}


export interface VoiceData {
  voiceId: number;
  voiceName: string;
}

export interface SelectableVoiceData extends VoiceData{
  selected: boolean;
}
